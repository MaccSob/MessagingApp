import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Register from './Register.jsx'
import './index.css';





createRoot(document.getElementById('root')).render(
  <StrictMode>
<Register></Register>
  </StrictMode>,
)
