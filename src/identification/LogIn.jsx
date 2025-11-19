import '../css/LogIn.css'
import { useState } from 'react'
import Email from "./LogIn/Email.jsx";
import Password from "./LogIn/Password.jsx";
import Submit from "./LogIn/Submit.jsx";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                    // erreur envoyée par FastAPI
                    setErrorMessage(result.detail || "Erreur inconnue");
                    return;
                }

                // ici tu es connecté
                localStorage.setItem("token", result.token);
                window.location.href = "/payment";
            })
            .catch(() => {
                setErrorMessage("Erreur de connexion au serveur");
            });
    }

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <Email input={email} setInput={setEmail}/>
                <Password input={password} setInput={setPassword}/>
                <Submit />
                <a href="/signin">Vous n'avez pas de compte ?</a>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}

export default LogIn;
