import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register/>
  </StrictMode>,
)
