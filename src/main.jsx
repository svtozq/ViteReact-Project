import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Payment from './Virement/Transaction/Payment.jsx'
import SignIn from "./identification/SignIn.jsx";
import Transaction_historic from "./Virement/Historique_Transaction/Transaction_historic.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);




