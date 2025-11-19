import './App.css'
import {Route, Routes, BrowserRouter, Link} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";

function SignInPage() {
    return <h1>Sign In Page</h1>;
}

function LogInPage() {
    return <h1>Log In Page</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;