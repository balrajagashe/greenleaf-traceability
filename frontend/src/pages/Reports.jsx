import React, { useEffect, useState } from 'react';

export default function Reports() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/leaf-entry`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setEntries);
  }, []);

  return (
    <div>
      <h2>Leaf Entry History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Date</th><th>Agent</th><th>Total</th>
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
