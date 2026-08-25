import React, { useState } from 'react';

function Tests() {
  const [category, setCategory] = useState('Syntax Check');
  const [status, setStatus] = useState('Idle');
  const [results, setResults] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const runTests = async () => {
    setStatus('Scanning project and generating test plan...');
    setResults(null);
    try {
      setStatus('Running tests...');
      const resp = await fetch(`${apiUrl}/api/test-project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to run tests');
      setResults(data);
      setStatus('Completed');
    } catch (err) {
      setStatus('Error');
      setResults({ error: err.message });
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Test & Debug</h1>

      <div className="mb-4">
        <label className="block mb-1">Testing Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option>Syntax Check</option>
          <option>Unit Testing</option>
          <option>UI Testing</option>
          <option>E2E</option>
          <option>Security</option>
          <option>Performance</option>
        </select>
      </div>

      <div className="mb-4">
        <button onClick={runTests} className="bg-black text-white px-4 py-2">Run Test Plan</button>
        <span className="ml-4">Status: <strong>{status}</strong></span>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Test Plan (LLM)</h2>
            <pre className="bg-gray-100 p-3 overflow-auto max-h-64">{JSON.stringify(results.plan, null, 2)}</pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Syntax Errors</h2>
            {results.syntax && results.syntax.length > 0 ? (
              <ul className="list-disc pl-6">
                {results.syntax.map((s, i) => (
                  <li key={i}>
                    <strong>{s.file}</strong>
                    <pre className="bg-red-50 p-2 mt-1">{s.output}</pre>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No syntax errors found in scanned files.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">Package Test Runs</h2>
            <pre className="bg-gray-100 p-3 overflow-auto max-h-64">{JSON.stringify(results.packageTestRuns, null, 2)}</pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold">UI / E2E Test Runs</h2>
            {results.uiTest ? (
              results.uiTest.parsed ? (
                <pre className="bg-gray-50 p-3 overflow-auto max-h-64">{JSON.stringify(results.uiTest.parsed, null, 2)}</pre>
              ) : (
                <pre className="bg-gray-100 p-3 overflow-auto max-h-64">{results.uiTest.raw || 'No output'}</pre>
              )
            ) : (
              <p>No UI tests executed for this category.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">Raw LLM Output</h2>
            <pre className="bg-gray-50 p-3 overflow-auto max-h-64">{results.groqRaw || 'No LLM output (API key missing or failed).'}</pre>
          </div>

        </div>
      )}
    </section>
  );
}

export default Tests;
