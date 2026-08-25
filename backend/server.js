import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { chatHandler } from './chatHandler.js';
import { testProjectHandler } from './testHandler.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Check for missing credentials
const isPlaceholder = 
  !SUPABASE_URL || 
  !SUPABASE_ANON_KEY || 
  SUPABASE_URL.includes('your-project') || 
  SUPABASE_URL.includes('placeholder');

if (isPlaceholder) {
  console.warn('\n[WARNING] Supabase environment variables are missing or using placeholders.');
  console.warn('Contact form submissions will fail until you provide valid credentials in backend/.env file.\n');
}

// Initialize Supabase Client (gracefully handle invalid credentials)
let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error.message);
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Akarsh Raj A P Portfolio API is running.',
    supabaseConfigured: !isPlaceholder && !!supabase
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Handle system not configured
  if (isPlaceholder || !supabase) {
    console.error('Contact form submission failed: Supabase credentials not configured.');
    return res.status(503).json({
      error: 'Database connection not configured. Please check backend environment variables.'
    });
  }

  try {
    // Insert into Supabase table
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase DB Error:', error);
      throw new Error(error.message);
    }

    console.log(`Success: New message stored in DB from: ${name.trim()} <${email.trim()}>`);
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: data
    });
  } catch (err) {
    console.error('Internal Server Error:', err.message);
    return res.status(500).json({
      error: 'An internal server error occurred while sending your message. Please try again later.'
    });
  }
});

// Chatbot endpoint
app.post('/api/chat', chatHandler);

// Project test endpoint
app.post('/api/test-project', testProjectHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
