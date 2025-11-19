import './App.css'
import {Route, Routes, BrowserRouter, Link,Navigate} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";
import Payment from "./Virement/Transaction/Payment.jsx";
import Header from "./Header.jsx";
import ProtectedRoute from "./TokenProtected.jsx";
import Transaction_historic from "./Virement/Historique_Transaction/Transaction_historic.jsx";



function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
                <Route path="/transaction_historic" element={<ProtectedRoute><Transaction_historic /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;