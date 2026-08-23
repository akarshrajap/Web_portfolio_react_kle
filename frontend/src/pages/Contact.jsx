import React, { useState } from 'react';
import confetti from 'canvas-confetti';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous status
    setStatus({ loading: true, success: null, error: null });

    // Client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        loading: false,
        success: null,
        error: 'Please fill in all the fields.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({
        loading: false,
        success: null,
        error: 'Please enter a valid email address.'
      });
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus({
        loading: false,
        success: data.message || 'Your message has been sent successfully.',
        error: null
      });

      // Clear the form
      setFormData({ name: '', email: '', message: '' });

      // Trigger minimalist elegant confetti
      triggerConfetti();

    } catch (err) {
      console.error('Contact Form Error:', err);
      setStatus({
        loading: false,
        success: null,
        error: err.message || 'Failed to connect to the server.'
      });
    }
  };

  const triggerConfetti = () => {
    // Elegant, minimalist black-and-silver confetti bursts
    const count = 150;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#000000', '#666666', '#cccccc', '#333333']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section>
      <h1 id="contact-title">Contact & Inquiries</h1>
      <p style={{ marginBottom: 'var(--space-lg)' }}>
        Have a training request, architecture project, or want to discuss upskilling your enterprise engineering team? Fill in the details below.
      </p>

      <form onSubmit={handleSubmit} id="contact-form" style={{ marginTop: 'var(--space-sm)' }}>
        <div className="form-group">
          <label htmlFor="form-name">Name</label>
          <input
            type="text"
            id="form-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={status.loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="form-email">Email</label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            disabled={status.loading}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
          <label htmlFor="form-message">Message</label>
          <textarea
            id="form-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or inquiry"
            disabled={status.loading}
            required
          />
        </div>

        <button 
          type="submit" 
          id="btn-submit-contact" 
          disabled={status.loading}
        >
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status.success && (
        <div className="toast-msg toast-success" id="contact-success-msg">
          <span>{status.success}</span>
        </div>
      )}

      {status.error && (
        <div className="toast-msg toast-error" id="contact-error-msg">
          <span>Error</span>
          <span style={{ fontWeight: 'var(--weight-light)', fontSize: '1rem' }}>{status.error}</span>
        </div>
      )}
    </section>
  );
}

export default Contact;
