// frontend/src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';

export default function Reports() {
  const [entries, setEntries] = useState([]);
  const [error, setError]    = useState('');

  useEffect(() => {
    setError('');
    fetch(`${import.meta.env.VITE_API_URL}/api/leaf-entry`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setEntries)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Leaf Entry History</h2>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Agent</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.date}</td>
              <td>{e.agent_id}</td>
              <td>{e.total_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

