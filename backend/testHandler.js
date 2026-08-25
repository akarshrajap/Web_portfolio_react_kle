import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();

const execFileAsync = promisify(execFile);

async function listFilesRecursive(dir, exts = ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json']) {
  const results = [];
  async function walk(current) {
    let entries;
    try {
      entries = await fs.promises.readdir(current, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === 'node_modules' || ent.name === '.git') continue;
        await walk(full);
      } else if (ent.isFile()) {
        if (exts.includes(path.extname(ent.name))) results.push(full);
      }
    }
  }
  await walk(dir);
  return results;
}

function summarizeContent(content, max = 800) {
  return content.length > max ? content.slice(0, max) + '\n... [truncated]' : content;
}

async function nodeSyntaxCheck(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    // Skip JSX/TSX files for Node's --check because Node doesn't understand those extensions
    if (ext === '.jsx' || ext === '.tsx') {
      return { file: filePath, ok: true, output: 'skipped (jsx/tsx)'};
    }
    // Use node --check to perform a quick syntax validation
    await execFileAsync('node', ['--check', filePath], { timeout: 30_000 });
    return { file: filePath, ok: true, output: '' };
  } catch (err) {
    return { file: filePath, ok: false, output: err.stderr || err.stdout || String(err) };
  }
}

async function runNpmTestIfAvailable(dir) {
  const pkgPath = path.join(dir, 'package.json');
  try {
    const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf8'));
    if (pkg.scripts && pkg.scripts.test) {
      try {
        let stdout, stderr;
        if (process.platform === 'win32') {
          const res = await execFileAsync('cmd.exe', ['/c', 'npm', 'test', '--silent'], { cwd: dir, timeout: 120_000 });
          stdout = res.stdout; stderr = res.stderr;
        } else {
          const npmCmd = 'npm';
          const res = await execFileAsync(npmCmd, ['test', '--silent'], { cwd: dir, timeout: 120_000 });
          stdout = res.stdout; stderr = res.stderr;
        }
        return { dir, ran: true, ok: true, output: stdout || stderr };
      } catch (err) {
        return { dir, ran: true, ok: false, output: err.stdout || err.stderr || String(err) };
      }
    }
  } catch (e) {
    // no package.json or parse error
  }
  return { dir, ran: false, ok: null, output: 'no test script' };
}

async function runPlaywrightTests(dir) {
  // Run Playwright tests in the frontend directory and capture JSON reporter output
  try {
    const env = { ...process.env };
    // Allow runtime override; fallback to a common alternate port used by Vite when 3000 is busy
    if (!env.PLAYWRIGHT_BASE_URL) env.PLAYWRIGHT_BASE_URL = 'http://localhost:3001';
    let stdout, stderr;
    if (process.platform === 'win32') {
      const res = await execFileAsync('cmd.exe', ['/c', 'npx', 'playwright', 'test', '--reporter=json'], { cwd: dir, timeout: 3 * 60_000, env });
      stdout = res.stdout; stderr = res.stderr;
    } else {
      const cmd = 'npx';
      const res = await execFileAsync(cmd, ['playwright', 'test', '--reporter=json'], { cwd: dir, timeout: 3 * 60_000, env });
      stdout = res.stdout; stderr = res.stderr;
    }
    const out = stdout || stderr || '';
    // Attempt to find JSON in output
    const jsonStart = out.indexOf('{');
    const jsonText = jsonStart !== -1 ? out.slice(jsonStart) : out;
    let parsed = null;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      // fallback: return raw output
      return { dir, ran: true, ok: true, raw: out, parsed: null };
    }
    return { dir, ran: true, ok: true, raw: out, parsed };
  } catch (err) {
    return { dir, ran: true, ok: false, raw: err.stdout || err.stderr || String(err), parsed: null };
  }
}

async function callGroq(messages, apiKey, model = 'qwen/qwen3.6-27b') {
  // Try to dynamically use an official SDK if available, otherwise fallback to fetch
  try {
    const sdk = await import('groq-sdk');
    if (sdk && sdk.GroqClient) {
      const client = new sdk.GroqClient({ apiKey, baseUrl: 'https://api.groq.com' });
      const resp = await client.chat.completions.create({ model, messages });
      return resp;
    }
  } catch (e) {
    // fall through to fetch fallback
  }

  // Fallback using fetch
  const fetch = (await import('node-fetch')).default;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 2048, reasoning_format: 'hidden' })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function testProjectHandler(req, res) {
  const category = req.body?.category || 'Syntax Check';
  // Determine repository root: if server is started from backend/, the repo root is its parent
  let projectRoot = path.resolve(process.cwd());
  if (!fs.existsSync(path.join(projectRoot, 'frontend')) && fs.existsSync(path.join(projectRoot, '..', 'frontend'))) {
    projectRoot = path.resolve(projectRoot, '..');
  }

  // Collect source files from frontend/src and backend
  const frontendDir = path.join(projectRoot, 'frontend', 'src');
  const backendDir = path.join(projectRoot, 'backend');

  const files = [];
  files.push(...(await listFilesRecursive(frontendDir).catch(() => [])));
  files.push(...(await listFilesRecursive(backendDir).catch(() => [])));

  // Prepare light summaries for the LLM
  const fileSamples = [];
  for (const f of files) {
    try {
      const content = await fs.promises.readFile(f, 'utf8');
      fileSamples.push({ path: path.relative(projectRoot, f), sample: summarizeContent(content, 1600) });
    } catch (e) {
      // ignore unreadable files
    }
  }

  const systemPrompt = `You are a senior QA engineer. Given a JavaScript/React codebase, produce a JSON test plan and a set of suggested automated checks tailored to the project. Return a single JSON object with these keys: \n- testPlan: array of {id, title, description, command (shell command to run), files: [paths]}\n- quickChecks: array of {id, title, description}\n- suggestions: array of {file, issue, fix}\nRespond only with valid JSON.`;

  const userPrompt = `Category: ${category}\nProject root: ${projectRoot}\nFiles (path + sample): ${fileSamples.map(f => `\n---\nPATH: ${f.path}\n${f.sample}`).join('')}\n\nCreate a concise JSON test plan and suggested fixes.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  const apiKey = process.env.GROQ_API_KEY;
  let groqResult = null;
  try {
    if (apiKey && apiKey !== 'your_groq_api_key_here') {
      const raw = await callGroq(messages, apiKey, process.env.GROQ_MODEL || 'qwen/qwen3.6-27b');
      // Attempt to extract textual content
      groqResult = raw.choices?.[0]?.message?.content || JSON.stringify(raw);
    } else {
      groqResult = null;
    }
  } catch (err) {
    groqResult = `Groq call failed: ${err.message}`;
  }

  // Try to parse JSON plan from Groq result if present
  let testPlan = null;
  if (groqResult) {
    try {
      // Extract JSON blob from response (attempt)
      const jsonStart = groqResult.indexOf('{');
      const jsonText = groqResult.slice(jsonStart);
      testPlan = JSON.parse(jsonText);
    } catch (e) {
      // fallback to simple auto-generated plan
      testPlan = null;
    }
  }

  if (!testPlan) {
    // Basic default plan if LLM not available or failed
    testPlan = {
      testPlan: [
        { id: 'syntax', title: 'Syntax checks', description: 'Run Node syntax checks on JS/JSX files', command: 'node --check <file>', files: fileSamples.slice(0, 20).map(f => f.path) },
        { id: 'package-tests', title: 'Run package test scripts', description: 'Run `npm test` in packages that define it', command: 'npm test', files: [] }
      ],
      quickChecks: [
        { id: 'has-tests', title: 'Has test scripts', description: 'Detect package.json test scripts in frontend/backend' }
      ],
      suggestions: []
    };
  }

  // Execute quick local checks: syntax and npm test scripts
  const syntaxPromises = [];
  // Only run node syntax checks on JavaScript/TS files (skip JSON, etc.)
  const filesToCheck = files.filter(f => ['.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx'].includes(path.extname(f).toLowerCase())).slice(0, 200);
  for (const f of filesToCheck) {
    syntaxPromises.push(nodeSyntaxCheck(f));
  }
  const syntaxResults = await Promise.all(syntaxPromises);

  // Check npm tests in frontend & backend
  const frontendPkgDir = path.join(projectRoot, 'frontend');
  const backendPkgDir = path.join(projectRoot, 'backend');
  const testRuns = [];
  testRuns.push(await runNpmTestIfAvailable(frontendPkgDir));
  testRuns.push(await runNpmTestIfAvailable(backendPkgDir));

  // Optionally run UI tests if requested or always when Playwright is present
  let uiTestResult = null;
  if (category.toLowerCase().includes('ui') || category.toLowerCase().includes('e2e')) {
    uiTestResult = await runPlaywrightTests(frontendPkgDir);
  }

  const result = {
    success: true,
    groqRaw: groqResult,
    plan: testPlan,
    syntax: syntaxResults.filter(r => !r.ok), // only report failures for brevity
    packageTestRuns: testRuns,
    uiTest: uiTestResult,
    scannedFiles: filesToCheck.length
  };

  return res.status(200).json(result);
}

export default testProjectHandler;
