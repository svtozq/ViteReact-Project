import '../css/LogIn.css'
import { useState } from 'react'
import Email from "./LogIn/Email.jsx";
import Password from "./LogIn/Password.jsx";
import Submit from "./LogIn/Submit.jsx";
import {Navigate} from "react-router-dom";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/payment" replace />;
    }

    function handleSubmit(e) {
        e.preventDefault();

        setErrorMessage(""); // reset erreur

        const data = {
            email: email,
            password: password
        };

        fetch("http://127.0.0.1:8000/user/login/", {
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

                localStorage.setItem("token", result.token);
                window.location.href = "/dashboard";
            })
            .catch(() => {
                setErrorMessage("Connection Server Error !");
            });
    }

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <Email input={email} setInput={setEmail}/>
                <Password input={password} setInput={setPassword}/>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <Submit />
                <a href="/signin">Vous n'avez pas de compte ?</a>
            </form>
        </div>
    );
}

export default LogIn;
