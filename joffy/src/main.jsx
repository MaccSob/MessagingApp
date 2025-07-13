import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from "./components/Register.jsx"
import Login from './components/Login.jsx'






createRoot(document.getElementById('root')).render(
  <StrictMode>

<Register></Register>


  </StrictMode>,
)
