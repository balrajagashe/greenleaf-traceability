// frontend/src/pages/STGs.jsx
import React, { useEffect, useState } from 'react';

export default function STGs() {
  const [stgs, setStgs]       = useState([]);
  const [name, setName]       = useState('');
  const [agentId, setAgentId] = useState('');
  const [area, setArea]       = useState('');
  const [error, setError]     = useState('');

  useEffect(() => {
    setError('');
    fetch(`${import.meta.env.VITE_API_URL}/api/stgs`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setStgs)
      .catch(err => setError(err.message));
  }, []);

  const addSTG = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stgs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name,
          agent_id: Number(agentId),
          land_area: Number(area)
        })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }
      const newStg = await res.json();
      setStgs(prev => [...prev, newStg]);
      setName('');
      setAgentId('');
      setArea('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>STGs</h2>
      <form onSubmit={addSTG}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Agent ID"
          value={agentId}
          onChange={e => setAgentId(e.target.value)}
        />
        <input
          placeholder="Area (ha)"
          value={area}
          onChange={e => setArea(e.target.value)}
        />
        <button type="submit">Add STG</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {stgs.map(s => (
          <li key={s.id}>
            {s.name} (Agent: {s.agent_id}, Area: {s.land_area} ha)
          </li>
        ))}
      </ul>
    </div>
  );
}
