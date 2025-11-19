import './App.css'
import {Route, Routes, BrowserRouter, Link,Navigate} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";
import Payment from "./Virement/Payment.jsx";
import Header from "./Header.jsx";
import ProtectedRoute from "./identification/TokenProtected.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/payment" replace />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;