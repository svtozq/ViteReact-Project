import '../css/SignIn.css'
import { useState } from 'react'
import LastName from "./SignIn/LastName.jsx";
import FirstName from "./SignIn/FirstName.jsx";
import Email from "./SignIn/Email.jsx";
import Password from "./SignIn/Password.jsx";
import Submit from "./SignIn/Submit.jsx";
import {Navigate} from "react-router-dom";

function SignIn() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    //Bouton qui envoie les données recuperer au back
    function handleSubmit(e) {
        e.preventDefault();

        setErrorMessage(""); // reset erreur

        const data = {
            last_name: String(lastName),
            first_name: String(firstName),
            email: String(email),
            password: String(password)
        };

        fetch("http://127.0.0.1:8000/user/signin/", {  // l'URL de FastAPI
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(async response => {
                const result = await response.json();

                if (!response.ok) {
                    setErrorMessage(result.detail || "Unknown Error !");
                    return;
                }

                window.location.href = "/login";
            })
            .catch(() => {
                setErrorMessage("Connection Server Error !");
            });
    }

    return (
        <>
            <div className="signInClass">
                <div className="form-group">
                <form>
                    <h2>Sign In</h2>
                    <LastName input={lastName} setInput={setLastName}/>
                    <FirstName input={firstName} setInput={setFirstName}/>
                    <Email input={email} setInput={setEmail}/>
                    <Password input={password} setInput={setPassword}/>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <Submit onClick={handleSubmit}/>
                    <a href="/login">Vous avez déjà un compte ?</a>
                </form>
                </div>
            </div>

        </>
    );
}

export default SignIn;