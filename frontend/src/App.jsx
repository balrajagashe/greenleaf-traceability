import React, { useState } from 'react'
import Login from './pages/Login'
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return loggedIn ? (
    <div className="container"><h1>Welcome to Green Leaf Traceability</h1></div>
  ) : <Login onLogin={() => setLoggedIn(true)} />
}
export default App