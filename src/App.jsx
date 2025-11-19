import './App.css'
import {Route, Routes, BrowserRouter, Link,Navigate} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";
import Payment from "./Virement/Payment.jsx";
import Header from "./Header.jsx";
import ProtectedRoute from "./TokenProtected.jsx";

function SignInPage() {
    return <h1>Sign In Page</h1>;
}

function LogInPage() {
    return <h1>Log In Page</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;