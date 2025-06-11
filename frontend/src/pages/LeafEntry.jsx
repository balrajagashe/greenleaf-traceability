import React, { useEffect, useState } from 'react';

export default function LeafEntry() {
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState('');
  const [dateVal, setDateVal] = useState(new Date().toISOString().slice(0,10));
  const [quantity, setQuantity] = useState('');
  const [alloc, setAlloc] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/leaf-entry`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setAgents);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/leaf-entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        agent_id: Number(agentId),
        date: dateVal,
        total_quantity: Number(quantity)
      })
    });
    const data = await res.json();
    setAlloc(data);
  };

  return (
    <div>
      <h2>Daily Leaf Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:
          <input type="date" value={dateVal} onChange={e => setDateVal(e.target.value)} />
        </label><br/>
        <label>Agent:
          <select value={agentId} onChange={e => setAgentId(e.target.value)}>
            <option value="">Select</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </label><br/>
        <label>Total Quantity:
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </label><br/>
        <button type="submit">Allocate</button>
      </form>
      {alloc && (
        <div>
          <h3>Allocations</h3>
          <ul>
            {alloc.allocations.map(item => (
              <li key={item.stg_id}>
                STG {item.stg_id}: {item.allocated_quantity.toFixed(2)} kg
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
