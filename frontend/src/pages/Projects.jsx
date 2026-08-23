import React from 'react';

function Projects() {
  const projectsList = [
    {
      title: "Agentic AI Orchestrator & Custom Copilots",
      role: "Lead Architect",
      desc: "Designed and deployed custom AI agents with Microsoft Copilot Studio and Azure OpenAI. Implemented custom OpenAPI plugins and orchestrated workflow pipelines using Semantic Kernel to ingest enterprise data sources (SharePoint and LOB databases).",
      tech: "Semantic Kernel, Azure OpenAI, Copilot Studio, OpenAPI, Python",
      link: "https://github.com/akarsh-raj-a-p-09b6a4207"
    },
    {
      title: "REST Microservice with IaC & Automated CI/CD",
      role: "Full-Stack & DevOps Engineer",
      desc: "Built a robust REST microservice using AI-assisted engineering throughout the SDLC. Configured GitHub Actions pipelines for automated linting, unit/integration testing, Docker image generation, and deployed using Terraform Infrastructure as Code.",
      tech: "Node.js, Express, Docker, Terraform, GitHub Actions, Jest",
      link: "https://github.com/akarsh-raj-a-p-09b6a4207"
    },
    {
      title: "MERN Stack Enterprise Training Curriculum",
      role: "Technical Curriculum Developer",
      desc: "Created a secure, production-grade learning blueprint showing modern state management, JWT/OAuth authentication protocols, and database schema design, successfully deploying dozens of applications to AWS and MongoDB cloud infrastructure.",
      tech: "React, Node.js, Express, MongoDB, AWS EC2/S3, JWT",
      link: "https://github.com/akarsh-raj-a-p-09b6a4207"
    },
    {
      title: "Automated Vulnerability Management Pipeline",
      role: "Infrastructure Consultant",
      desc: "Developed custom automation runbooks in Azure to manage security patching schedules and coordinate alert reports via S360, reducing general infrastructure vulnerability risks by 30% and maintaining peak system SLA compliance.",
      tech: "Azure Runbooks, PowerShell, S360, Azure Monitor",
      link: "https://github.com/akarsh-raj-a-p-09b6a4207"
    },
    {
      title: "Enterprise BI Real-Time Dashboard Engine",
      role: "BI & Data Analyst",
      desc: "Created high-performance business intelligence dashboards using Power BI and Tableau. Formulated complex DAX queries and data transformations to monitor operational health and incident response rates, boosting reporting efficiency by 40%.",
      tech: "Power BI, DAX, KQL, Power Query, Tableau",
      link: "https://github.com/akarsh-raj-a-p-09b6a4207"
    }
  ];

  return (
    <section>
      <h1 id="projects-title">Featured Projects</h1>
      <p style={{ marginBottom: 'var(--space-lg)' }}>
        A compilation of architecture work, open-source projects, and training frameworks.
      </p>

      <div className="list-section">
        {projectsList.map((project, idx) => (
          <div key={idx} className="project-card">
            <span className="list-item-meta">{project.role}</span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: '800', margin: '0 0 var(--space-xxs) 0' }}>
              {project.title}
            </h3>
            <p style={{ marginBottom: 'var(--space-xs)' }}>
              {project.desc}
            </p>
            <p className="project-tags">
              <strong>Stack:</strong> {project.tech}
            </p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 'var(--space-xxs)', fontSize: '0.95rem' }}
            >
              View Repository &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
