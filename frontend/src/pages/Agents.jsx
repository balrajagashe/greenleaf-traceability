import React, { useEffect, useState } from 'react';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/agents`, { … })
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setAgents);
  }, []);

  const addAgent = async e => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, contact_info: contact })
    });
    const newAgent = await res.json();
    setAgents([...agents, newAgent]);
    setName(''); setContact('');
  };

  return (
    <div>
      <h2>Agents</h2>
      <form onSubmit={addAgent}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} />
        <button type="submit">Add Agent</button>
      </form>
      <ul>
        {agents.map(a => <li key={a.id}>{a.name} ({a.contact_info})</li>)}
      </ul>
    </div>
  );
}
