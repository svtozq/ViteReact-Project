import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './identification/SignIn.jsx'
import LogIn from './identification/LogIn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogIn />
  </StrictMode>,
)
