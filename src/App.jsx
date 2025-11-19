import './App.css'

import {Route, Routes, BrowserRouter, Link,Navigate} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";
import Payment from "./Virement/Payment.jsx";

function SignInPage() {
    return <h1>Sign In Page</h1>;
}

function LogInPage() {
    return <h1>Log In Page</h1>;
}
import BeneficiaryPage from "./beneficiary/beneficiaryPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/beneficiary" element={<BeneficiaryPage/>}/>
            </Routes>
        </BrowserRouter>
    )

}
    export default App;

