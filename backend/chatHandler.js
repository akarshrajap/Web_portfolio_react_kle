import dotenv from 'dotenv';
dotenv.config();

// Standard Swiss-minimal portfolio context documents
const portfolioDocuments = [
  {
    id: "bio",
    title: "Akarsh Raj A P - Biography & Professional Philosophy",
    tags: ["bio", "about", "philosophy", "experience", "role", "akarsh", "raj"],
    content: "Akarsh Raj A P is a GenAI, Cloud Architect & Fullstack developer and Technical Trainer with over 8+ years of experience upskilling teams. His philosophy is to demystify complex systems, helping engineering teams and students build secure, scalable solutions with confidence. He works across the software lifecycle as a consultant, architect, and trainer."
  },
  {
    id: "experience-capgemini",
    title: "Experience at Capgemini & Techie Solutions",
    tags: ["experience", "jobs", "capgemini", "copilot", "semantic kernel", "azure", "openai", "consultant", "architect"],
    content: "From Dec 2025 to May 2026, Akarsh worked as an Enterprise AI & Copilot Solutions Consultant at Capgemini (Techie Solutions). He designed and deployed custom AI agents using Copilot Studio and Azure OpenAI, integrating custom OpenAPI specs and Semantic Kernel orchestration. He also managed full-stack REST microservices, automated threat modeling, and accelerated IaC scripting with Terraform and Bicep."
  },
  {
    id: "experience-kle",
    title: "Experience at KLE JT College & Don Bosco",
    tags: ["experience", "jobs", "kle", "don bosco", "trainer", "mern", "cloud", "teaching", "college", "mentor"],
    content: "From Mar 2024 to Nov 2025, Akarsh worked as a MERN FullStack & Cloud Trainer at KLE JT College (Don Bosco Tech Society). He delivered high-impact bootcamps mentoring over 100+ students in modern web development, designed robust curricula focusing on security, JWT authentication, and cloud deployment, and ensured 100% of capstone projects were integrated with MongoDB and deployed to production."
  },
  {
    id: "experience-ltm",
    title: "Experience at LTMLimited",
    tags: ["experience", "jobs", "ltm", "ltmlimited", "azure", "patching", "automation", "manager", "endpoint"],
    content: "From Feb 2022 to Feb 2024, Akarsh worked as a Trainer & Junior Consultant at LTMLimited. He orchestrated Microsoft Endpoint Manager training to maintain 99.9% uptime, mentored junior engineers in Azure server configuration (reducing setup times by 25%), and directed automated patching using Azure Runbooks and S360."
  },
  {
    id: "experience-srinivas",
    title: "Experience at Srinivas University Mangalore",
    tags: ["experience", "jobs", "srinivas", "data analytics", "power bi", "tableau", "azureml", "educator"],
    content: "From Aug 2020 to Jan 2022, Akarsh served as a Data Analytics & AzureML Educator at Srinivas University Mangalore. He designed and delivered Business Intelligence and DAX schemas in Power BI and Tableau, and instructed students on cutting-edge Azure Machine Learning studio workflows and production-ready cloud analytics models."
  },
  {
    id: "experience-rnsit",
    title: "Experience at RNS Institute of Technology",
    tags: ["experience", "jobs", "rnsit", "aws", "cloud", "vpc", "trainer"],
    content: "From Apr 2019 to Aug 2020, Akarsh worked as an AWS Cloud Trainer at RNS Institute of Technology, delivering comprehensive Cloud Architecture programs covering Virtualization, VPC/Subnets, Identity Management (IAM), Load Balancing, and CloudWatch cost optimization."
  },
  {
    id: "project-copilots",
    title: "Project: Agentic AI Orchestrator & Custom Copilots",
    tags: ["projects", "copilot", "azure", "openai", "semantic kernel", "python", "openapi", "architect"],
    content: "As Lead Architect, Akarsh designed and deployed custom AI agents with Microsoft Copilot Studio and Azure OpenAI. He implemented custom OpenAPI plugins and orchestrated workflow pipelines using Semantic Kernel to ingest enterprise data sources (SharePoint and LOB databases)."
  },
  {
    id: "project-microservice",
    title: "Project: REST Microservice with IaC & Automated CI/CD",
    tags: ["projects", "microservice", "devops", "docker", "terraform", "github actions", "jest", "cicd"],
    content: "As a Full-Stack & DevOps Engineer, Akarsh built a robust REST microservice using AI-assisted engineering throughout the SDLC. He configured GitHub Actions pipelines for automated linting, unit/integration testing, Docker image generation, and deployed using Terraform Infrastructure as Code."
  },
  {
    id: "project-mern",
    title: "Project: MERN Stack Enterprise Training Curriculum",
    tags: ["projects", "mern", "training", "react", "mongodb", "aws", "jwt", "curriculum"],
    content: "As a Technical Curriculum Developer, Akarsh created a secure, production-grade learning blueprint showing modern state management, JWT/OAuth authentication protocols, and database schema design, successfully deploying dozens of applications to AWS and MongoDB cloud infrastructure."
  },
  {
    id: "project-vulnerability",
    title: "Project: Automated Vulnerability Management Pipeline",
    tags: ["projects", "security", "azure runbooks", "powershell", "s360", "patching", "vulnerability"],
    content: "As an Infrastructure Consultant, Akarsh developed custom automation runbooks in Azure to manage security patching schedules and coordinate alert reports via S360, reducing general infrastructure vulnerability risks by 30% and maintaining peak system SLA compliance."
  },
  {
    id: "project-bi",
    title: "Project: Enterprise BI Real-Time Dashboard Engine",
    tags: ["projects", "bi", "data", "power bi", "dax", "kql", "tableau", "analytics"],
    content: "As a BI & Data Analyst, Akarsh created high-performance business intelligence dashboards using Power BI and Tableau. He formulated complex DAX queries and data transformations to monitor operational health and incident response rates, boosting reporting efficiency by 40%."
  },
  {
    id: "skills-mern",
    title: "Skills: MERN Stack & Frontend Development",
    tags: ["skills", "mern", "react", "node", "express", "mongodb", "javascript", "css", "html", "routing", "state"],
    content: "Akarsh is highly skilled in MERN Stack & Frontend: React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), HTML5, CSS3, modern routing & state management."
  },
  {
    id: "skills-ai",
    title: "Skills: Enterprise AI & GenAI Solutions",
    tags: ["skills", "ai", "genai", "copilot studio", "azure openai", "semantic kernel", "extensibility"],
    content: "Akarsh is highly skilled in Enterprise AI & GenAI: Microsoft Copilot Studio, Azure OpenAI, Custom Agent Development, Semantic Kernel Orchestration, M365 Agent extensibility."
  },
  {
    id: "skills-cloud",
    title: "Skills: Cloud Platforms & Infrastructure Management",
    tags: ["skills", "cloud", "aws", "azure", "vpc", "runbooks", "monitoring", "s360", "ec2", "s3"],
    content: "Akarsh is highly skilled in Cloud & Infrastructure: AWS (EC2, S3, Lambda, VPC, ELB, Auto Scaling, Elastic Beanstalk) and Azure (VMs, Blob Storage, Azure Monitor, S360, Runbooks)."
  },
  {
    id: "skills-devops",
    title: "Skills: DevOps, Tooling & Automation",
    tags: ["skills", "devops", "terraform", "bicep", "github actions", "ci/cd", "git", "github", "threat"],
    content: "Akarsh is highly skilled in DevOps & Tooling: GitHub Actions, Terraform, Bicep, Git/GitHub, CI/CD Pipelines, Postman, VS Code, automated threat modeling."
  },
  {
    id: "skills-data",
    title: "Skills: Data Analytics, Languages & ML Models",
    tags: ["skills", "data", "python", "sql", "kql", "ml", "azureml", "tableau"],
    content: "Akarsh is highly skilled in Data Languages & ML: Python scripting, SQL data transformation, KQL (Kusto Query Language) log analytics, Azure ML Studio, Automated ML, predictive modeling."
  },
  {
    id: "skills-security",
    title: "Skills: API Design & Security Integration",
    tags: ["skills", "security", "apis", "jwt", "rest", "ceh", "ethical hacker"],
    content: "Akarsh is highly skilled in API & Security Integration: RESTful API Design, JWT Authentication, Secure Policy Management, CEH (Certified Ethical Hacker) security concepts."
  },
  {
    id: "skills-analytics",
    title: "Skills: Analytics & Visualizations",
    tags: ["skills", "analytics", "power bi", "dax", "tableau", "dashboards", "bi"],
    content: "Akarsh is highly skilled in Analytics & Visualization: Power BI (DAX, Power Query), Tableau, AI visuals integration, real-time analytics dashboards."
  },
  {
    id: "code-structure",
    title: "Codebase Structure & Portfolio Architecture",
    tags: ["code", "file", "structure", "folder", "frontend", "backend", "architecture", "monorepo"],
    content: "The portfolio website codebase is organized as a monorepo split into two primary folders: 'frontend/' and 'backend/'. The frontend is built using React with Vite as the build tool, and uses React Router DOM for page navigation. The backend is a Node.js Express server that handles form submissions and AI chatbot queries."
  },
  {
    id: "code-backend",
    title: "Backend Code Logic (server.js & chatHandler.js)",
    tags: ["code", "file", "server.js", "chathandler.js", "backend", "express", "supabase", "contact", "chat"],
    content: "The backend server is implemented in 'backend/server.js' using Express.js. It mounts two primary API routes: 1) POST '/api/contact' which validates contact inquiries and saves them to a Supabase database using the '@supabase/supabase-js' client; 2) POST '/api/chat' which processes virtual assistant queries. Chat requests are routed to 'backend/chatHandler.js' which runs an in-memory keyword retriever (RAG) and calls the Groq Qwen model."
  },
  {
    id: "code-chatbot",
    title: "Chatbot Component Frontend Code (Chatbot.jsx)",
    tags: ["code", "file", "chatbot.jsx", "frontend", "react", "component", "assistant", "hooks"],
    content: "The floating chatbot is implemented in 'frontend/src/components/Chatbot.jsx'. It uses React hooks ('useState', 'useEffect', 'useRef') to handle open/closed visual states, message logs, and loading indicators. It queries the backend '/api/chat' API by resolving the base URL dynamically from Vite's env variables (falling back to localhost:5000 in development)."
  },
  {
    id: "code-contact",
    title: "Contact Form Frontend Code (Contact.jsx)",
    tags: ["code", "file", "contact.jsx", "frontend", "confetti", "form", "validation", "supabase"],
    content: "The contact form is located in 'frontend/src/pages/Contact.jsx'. It manages input forms ('name', 'email', 'message') with client-side regex validations. On submitting, it sends a POST request to '/api/contact'. Once saved in Supabase, it triggers a custom, minimalist silver-and-black confetti burst animation utilizing the 'canvas-confetti' library."
  },
  {
    id: "code-css",
    title: "Styling and CSS System (index.css)",
    tags: ["code", "file", "index.css", "styling", "css", "brutalist", "swiss", "design"],
    content: "The visual presentation of the portfolio is managed by 'frontend/src/index.css'. It follows a Swiss Design/Brutalist style with a pure white background, heavy uppercase bold contrast headings, and strictly no border boxes or card backgrounds. The chatbot widget floating rules, custom message lines, and mobile media queries are appended at the bottom of the style sheet."
  },
  {
    id: "code-deploy",
    title: "Deployment Services Config (render.yaml)",
    tags: ["code", "file", "render.yaml", "deployment", "hosting", "render", "config"],
    content: "The deployment to hosting services is defined in the root 'render.yaml' file. It configures two Render services: 1) a static site service hosting the frontend build output ('dist/' folder built via 'npm run build' inside 'frontend/'); 2) a web service running the Node.js backend using 'npm start' inside the 'backend/' directory."
  }
];

// Set of common English words to filter out for keyword search
const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'of', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'i', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'been', 'call', 'who', 'its', 'now', 'find'
]);

// Custom keyword matcher (in-memory retrieval)
function retrieveRelevantDocs(query, documents, limit = 4) {
  const queryTokens = query.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));

  if (queryTokens.length === 0) {
    // Return top general documents if search query contains no useful keywords
    return documents.slice(0, limit);
  }

  const scoredDocs = documents.map(doc => {
    let score = 0;
    const contentLower = doc.content.toLowerCase();
    const titleLower = doc.title.toLowerCase();
    
    queryTokens.forEach(token => {
      // Score direct tags matches (highly relevant)
      if (doc.tags.includes(token)) {
        score += 5.0;
      }
      
      // Score title matches
      if (titleLower.includes(token)) {
        score += 3.0;
      }

      // Score content matches with term frequency
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      const matches = contentLower.match(regex);
      if (matches) {
        score += matches.length * 1.5;
      } else if (contentLower.includes(token)) {
        score += 0.5;
      }
    });

    return { doc, score };
  });

  // Sort and filter out zero-score documents
  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.doc);
}

export async function chatHandler(req, res) {
  const { message, history } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Retrieve relevant documents using our in-memory retriever
  const relevantDocs = retrieveRelevantDocs(message, portfolioDocuments, 4);
  
  // Format context for LLM
  const contextString = relevantDocs.map((doc, idx) => {
    return `[Document ${idx + 1}] Title: ${doc.title}\nContent: ${doc.content}`;
  }).join("\n\n");

  const systemPrompt = `You are a polite, concise, and highly knowledgeable AI virtual assistant chatbot for Akarsh Raj A P's portfolio website.
Your role is to answer visitor questions about Akarsh's programming workflows, project details, skills, and professional experience.

Here is the relevant, verified context from Akarsh's portfolio:
${contextString}

Guidelines:
1. Ground your answers strictly in the verified context provided above.
2. If the user asks something that cannot be answered using the provided context, politely state: "I don't have that information in my portfolio database. Please feel free to use the Contact page form or email me directly!"
3. Be professional, concise, and friendly. Answer in 1-3 direct sentences.
4. Akarsh Raj A P is a GenAI, Cloud Architect & Fullstack developer with over 8 years of experience.
5. Do not invent any projects or certifications not listed in the verified context.
6. Do NOT include any thinking steps, internal reasoning, monologues, or <think> tags in your output. Provide only the direct answer to the user's question.
`;

  // Check for Groq API key config
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    console.warn("[WARNING] GROQ_API_KEY is not configured. Returning fallback debug response.");
    // Fallback response for safe debugging without crashing
    const sampleAnswer = `(Fallback Mode) Hello! I'm Akarsh's virtual assistant. I found these topics in the portfolio context: ${relevantDocs.map(d => d.title).join(", ")}. Please configure GROQ_API_KEY to get real AI answers.`;
    return res.status(200).json({
      success: true,
      message: sampleAnswer,
      contextUsed: relevantDocs.map(d => d.id)
    });
  }

  const model = process.env.GROQ_MODEL || "qwen/qwen3.6-27b";

  try {
    // Build message list matching OpenAI format
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Append history (limit to last 6 messages to save token limit and maintain context)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      recentHistory.forEach(msg => {
        if (msg.role && msg.content) {
          messages.push({ role: msg.role, content: msg.content });
        }
      });
    }

    // Append current user message
    messages.push({ role: "user", content: message });

    // Request Groq completions API using native node-fetch
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.2,
        max_tokens: 2048,
        reasoning_format: "hidden"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error Response:", data);
      throw new Error(data.error?.message || "Failed to communicate with Groq API.");
    }

    let aiMessage = data.choices[0].message.content || "";
    console.log("Raw AI message content:", JSON.stringify(aiMessage));
    
    // Strip Qwen/DeepSeek thinking blocks programmatically (both complete and cut-off blocks)
    aiMessage = aiMessage.replace(/<think>[\s\S]*?<\/think>/gi, '');
    if (aiMessage.includes('<think>')) {
      const thinkIndex = aiMessage.indexOf('<think>');
      const endThinkIndex = aiMessage.indexOf('</think>');
      if (endThinkIndex !== -1) {
        aiMessage = aiMessage.substring(0, thinkIndex) + aiMessage.substring(endThinkIndex + 8);
      } else {
        aiMessage = aiMessage.substring(0, thinkIndex);
      }
    }
    aiMessage = aiMessage.trim();

    return res.status(200).json({
      success: true,
      message: aiMessage,
      contextUsed: relevantDocs.map(d => d.id)
    });

  } catch (err) {
    console.error("Chat Handler error:", err.message);
    return res.status(500).json({
      error: "An error occurred while generating the chatbot response. Please try again later."
    });
  }
}
