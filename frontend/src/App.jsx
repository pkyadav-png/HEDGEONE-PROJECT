import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Backend API URL
const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  // 1. READ: Tasks ko load karna
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. CREATE / UPDATE: Form submit handle karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');

    const taskData = { title, description, status, due_date: dueDate || null };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, taskData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, taskData);
      }
      setTitle('');
      setDescription('');
      setStatus('');
      setDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // 3. EDIT: Task ko form me load karna
  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status || 'Todo');
    setDueDate(task.due_date ? task.due_date.substring(0, 10) : '');
  };

  // 4. DELETE: Task hatana
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '750px', margin: '40px auto', padding: '0 20px' }}>
      <h1 className="dashboard-heading">Task Manager Dashboard</h1>
      
      {/* Form Section */}
      <form onSubmit={handleSubmit} className='premium-form-card'>
        <h4 style={{ margin: '0 0 15px 0', background: 'white', borderRadius:'20px'}}>{editingId ? 'Edit Task' : 'Create New Task'}</h4>
        <div style={{ display: 'grid', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Task Title *" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
          <textarea 
            placeholder="Description (Optional)" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', height: '60px', resize: 'none' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              <option value=""disabled hidden>status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <button type="submit" className='premium-save-btn'>
            {editingId ? 'Update Task' : 'Save Task'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDescription(''); setStatus('Pending'); setDueDate(''); }} style={{ padding: '8px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Task List Section */}
      <div>
        <h4 style={{ marginBottom: '15px' }}>Task List ({tasks.length})</h4>
        {tasks.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center' }}>No tasks available. Create one above!</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {tasks.map((task) => (
              <div key={task.id} className='premium-task-card' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', borderLeft: `5px solid ${task.status === 'Completed' ? '#16a34a' : task.status === 'In Progress' ? '#ea580c' : '#2563eb'}` }}>
                <div>
                  <h5 style={{ margin: '0 0 4px 0', fontSize: '16px', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>{task.title}</h5>
                  <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#475569' }}>{task.description}</p>
                  <small style={{ color: '#94a3b8' }}>Due: {task.due_date ? task.due_date.substring(0, 10) : 'No date'} | <strong>{task.status}</strong></small>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(task)} className='edit-task-btn' style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                  <button onClick={() => handleDelete(task.id)} className='delete-task-btn' style={{ padding: '6px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;