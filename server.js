const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// Middleware: Isse frontend aur backend bina kisi error ke connect hote hain
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Supabase database se connection set up karna
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 1. CREATE Route: Naya task database me save karne ke liye
app.post('/api/tasks', async (req, res) => {
  const { title, description, status, due_date } = req.body;
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, description, status, due_date }])
    .select();
  
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// 2. READ Route: Saare tasks ko database se load karke dashboard par dikhane ke liye
app.get('/api/tasks', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 3. UPDATE Route: Kisi bhi task ko edit ya update karne ke liye
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  const { data, error } = await supabase
    .from('tasks')
    .update({ title, description, status, due_date })
    .eq('id', id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// 4. DELETE Route: Kisi task ko database se poori tarah mitaane ke liye
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Task deleted successfully' });
});

// Server ko Port 5000 par run karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));