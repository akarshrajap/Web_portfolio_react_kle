import React from 'react';

function Skills() {
  const skillCategories = [
    {
      title: "MERN Stack & Frontend",
      skills: "React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), HTML5, CSS3, modern routing & state management."
    },
    {
      title: "Enterprise AI & GenAI",
      skills: "Microsoft Copilot Studio, Azure OpenAI, Custom Agent Development, Semantic Kernel Orchestration, M365 Agent extensibility."
    },
    {
      title: "Cloud & Infrastructure",
      skills: "AWS (EC2, S3, Lambda, VPC, ELB, Auto Scaling, Elastic Beanstalk), Azure (VMs, Blob Storage, Azure Monitor, S360, Runbooks)."
    },
    {
      title: "DevOps & Tooling",
      skills: "GitHub Actions, Terraform, Bicep, Git/GitHub, CI/CD Pipelines, Postman, VS Code, automated threat modeling."
    },
    {
      title: "Data Languages & ML",
      skills: "Python scripting, SQL data transformation, KQL (Kusto Query Language) log analytics, Azure ML Studio, Automated ML, predictive modeling."
    },
    {
      title: "API & Security Integration",
      skills: "RESTful API Design, JWT Authentication, Secure Policy Management, CEH (Certified Ethical Hacker) security concepts."
    },
    {
      title: "Analytics & Visualization",
      skills: "Power BI (DAX, Power Query), Tableau, AI visuals integration, real-time analytics dashboards."
    }
  ];

  return (
    <section>
      <h1 id="skills-title">Technical Expertise</h1>
      <p style={{ marginBottom: 'var(--space-lg)' }}>
        A structured overview of core technologies, tools, and methodologies I have mastered and taught over my career.
      </p>

      <div className="list-section">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-category">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: 'var(--space-xxs)' }}>
              {category.title}
            </h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              {category.skills}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
