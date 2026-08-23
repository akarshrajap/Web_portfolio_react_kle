import React from 'react';

function About() {
  return (
    <section>
      <h1 id="about-title">Philosophy & Background</h1>
      
      <p style={{ fontSize: '1.25rem', fontWeight: '400', marginBottom: 'var(--space-md)' }}>
        I believe that the future of engineering lies at the intersection of enterprise AI automation, modular cloud architectures, and structured technical mentorship. My philosophy is to demystify complex systems, helping engineering teams and students build secure, scalable solutions with confidence.
      </p>

      <p style={{ marginBottom: 'var(--space-lg)' }}>
        Over the past 8+ years, I have worked across the software lifecycle as a consultant, architect, and trainer. Whether leading bootcamps for colleges, optimizing multi-cloud deployments, or building custom agentic workflows with Semantic Kernel and Azure OpenAI, my focus remains on delivery excellence and SDLC acceleration.
      </p>

      <h2 id="experience-title">Selected Experience</h2>
      
      <div className="list-section" style={{ marginTop: 'var(--space-sm)' }}>
        <div className="list-item">
          <span className="list-item-meta">Dec 2025 — May 2026</span>
          <h3>Capgemini, Techie Solutions</h3>
          <p style={{ fontWeight: '400', margin: '0' }}>Enterprise AI & Copilot Solutions Consultant</p>
          <p>
            Designed and deployed custom AI agents using Copilot Studio and Azure OpenAI, integrating custom OpenAPI specs and Semantic Kernel orchestration. Managed full-stack REST microservices, automated threat modeling, and accelerated IaC scripting with Terraform and Bicep.
          </p>
        </div>

        <div className="list-item">
          <span className="list-item-meta">Mar 2024 — Nov 2025</span>
          <h3>KLE JT College, Don Bosco Tech Society</h3>
          <p style={{ fontWeight: '400', margin: '0' }}>MERN FullStack & Cloud Trainer</p>
          <p>
            Delivered high-impact bootcamps mentoring over 100+ students in modern web development. Designed robust curricula focusing on security, JWT authentication, and cloud deployment, ensuring 100% of capstone projects were integrated with MongoDB and deployed to production.
          </p>
        </div>

        <div className="list-item">
          <span className="list-item-meta">Feb 2022 — Feb 2024</span>
          <h3>LTMLimited</h3>
          <p style={{ fontWeight: '400', margin: '0' }}>Trainer & Junior Consultant</p>
          <p>
            Orchestrated Microsoft Endpoint Manager training to maintain 99.9% uptime. Mentored junior engineers in Azure server configuration, reducing setup times by 25%. Directed automated patching using Azure Runbooks and S360.
          </p>
        </div>

        <div className="list-item">
          <span className="list-item-meta">Aug 2020 — Jan 2022</span>
          <h3>Srinivas University Mangalore</h3>
          <p style={{ fontWeight: '400', margin: '0' }}>Data Analytics & AzureML Educator</p>
          <p>
            Designed and delivered Business Intelligence and DAX schemas in Power BI and Tableau. Instructed students on cutting-edge Azure Machine Learning studio workflows and production-ready cloud analytics models.
          </p>
        </div>

        <div className="list-item">
          <span className="list-item-meta">Apr 2019 — Aug 2020</span>
          <h3>RNS Institute of Technology</h3>
          <p style={{ fontWeight: '400', margin: '0' }}>AWS Cloud Trainer</p>
          <p>
            Delivered comprehensive Cloud Architecture programs covering Virtualization, VPC/Subnets, Identity Management (IAM), Load Balancing, and CloudWatch cost optimization.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
