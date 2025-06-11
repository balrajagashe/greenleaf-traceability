// frontend/src/pages/Agents.jsx
import React, { useEffect, useState } from 'react';

export default function Agents() {
  const [agents, setAgents]     = useState([]);
  const [name, setName]         = useState('');
  const [contact, setContact]   = useState('');
  const [error, setError]       = useState('');

  useEffect(() => {
    setError('');
    fetch(`${import.meta.env.VITE_API_URL}/api/agents`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setAgents)
      .catch(err => setError(err.message));
  }, []);

  const addAgent = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, contact_info: contact })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }
      const newAgent = await res.json();
      setAgents(prev => [...prev, newAgent]);
      setName('');
      setContact('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Agents</h2>
      <form onSubmit={addAgent}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
        <button type="submit">Add Agent</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {agents.map(a => (
          <li key={a.id}>
            {a.name} ({a.contact_info})
          </li>
        ))}
      </ul>
    </div>
  );
}
