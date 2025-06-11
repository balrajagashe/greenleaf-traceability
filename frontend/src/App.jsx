import React, { useState } from 'react';
import Login   from './pages/Login';
import Agents  from './pages/Agents';
import STGs    from './pages/STGs';
import LeafEntry from './pages/LeafEntry';
import Reports   from './pages/Reports';
import './style.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView]       = useState('agents');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="container">
      <img src="/climetz-logo.png" alt="Climetz Logo" className="logo" />
      <nav>
        <button onClick={() => setView('agents')}>Agents</button>
        <button onClick={() => setView('stgs')}>STGs</button>
        <button onClick={() => setView('leaf')}>Leaf Entry</button>
        <button onClick={() => setView('reports')}>Reports</button>
      </nav>
      <div className="view-container">
        {view === 'agents'   && <Agents />}
        {view === 'stgs'     && <STGs />}
        {view === 'leaf'     && <LeafEntry />}
        {view === 'reports'  && <Reports />}
      </div>
    </div>
  );
}

export default App;
