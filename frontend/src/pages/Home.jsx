import React from 'react';

function Home() {
  return (
    <section className="list-item" style={{ marginTop: 'var(--space-md)' }}>
      <img 
        src="/assets/profile.jpg" 
        alt="Akarsh Raj A P" 
        className="profile-pic" 
        id="profile-image"
      />
      
      <h1 id="home-title">Akarsh Raj A P</h1>
      
      <p style={{ fontSize: '1.45rem', fontWeight: '800', lineHeight: '1.3', letterSpacing: '-0.03em', marginBottom: 'var(--space-sm)' }}>
        GenAi, Cloud Architect & Fullstack. Technical Trainer with 8+ Years of Experience Upskilling Teams.
      </p>
      
      <p style={{ marginBottom: 'var(--space-md)', fontSize: '1.15rem' }}>
        Designing custom AI agents with Microsoft Copilot Studio and Azure OpenAI. Mentoring enterprise engineers on cloud-native systems, MERN stacks, and high-performance server architectures.
      </p>
      
      <div>
        <a 
          href="/assets/resume.pdf" 
          download="Akarsh_Raj_Resume.pdf" 
          className="btn" 
          id="btn-download-resume"
          style={{ fontSize: '1.25rem' }}
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}

export default Home;
