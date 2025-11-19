import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Payment from './Virement/Payment.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Payment />
  </StrictMode>,
)
