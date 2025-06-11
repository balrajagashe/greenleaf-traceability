import React, { useEffect, useState } from 'react';

export default function STGs() {
  const [stgs, setStgs] = useState([]);
  const [name, setName] = useState('');
  const [agentId, setAgentId] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/stgs`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setStgs);
  }, []);

  const addSTG = async e => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/stgs`, {
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
    const newStg = await res.json();
    setStgs([...stgs, newStg]);
    setName(''); setAgentId(''); setArea('');
  };

  return (
    <div>
      <h2>STGs</h2>
      <form onSubmit={addSTG}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Agent ID" value={agentId} onChange={e => setAgentId(e.target.value)} />
        <input placeholder="Area (ha)" value={area} onChange={e => setArea(e.target.value)} />
        <button type="submit">Add STG</button>
      </form>
      <ul>
        {stgs.map(s => (
          <li key={s.id}>
            {s.name} (Agent: {s.agent_id}, Area: {s.land_area}ha)
          </li>
        ))}
      </ul>
    </div>
  );
}
