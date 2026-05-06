import { useState, useEffect } from 'react'

function App() {
  const [status, setStatus] = useState('Checking API...')

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setStatus('API is connected: ' + data.message))
      .catch(err => setStatus('API not connected!'))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MicroStack Generated App</h1>
      <p>Status: {status}</p>
      <p>Edit <code>src/App.jsx</code> to get started.</p>
    </div>
  )
}

export default App
