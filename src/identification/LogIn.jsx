import '../css/LogIn.css'
import { useState } from 'react'
import Email from "./LogIn/Email.jsx";
import Password from "./LogIn/Password.jsx";
import Submit from "./LogIn/Submit.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //Bouton qui envoie les données recuperer au back
    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: String(email),
            password: String(password)
        };

        fetch("http://127.0.0.1:8000/user/login/", {  // l'URL de FastAPI
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {if (result && result.user_id) {
                // 🔹 Connexion réussie
                console.log("Connexion réussie :", result);
                // Optionnel : stocker le token ou user_id dans localStorage
                localStorage.setItem("user", JSON.stringify(result));
                // Redirection vers le Dashboard
                navigate("/dashboard");
            } else {
                setError("Email ou mot de passe incorrect");
            }
            })
            .catch(err => {
                console.error("Erreur :", err);
                setError("Erreur serveur, réessayez plus tard");
            });
    }

    return (
        <>
            <div>
                <div className="form-group">
                    <form onClick={handleSubmit}>
                        <h2>Log In</h2>
                        {error && <p style={{color: "red"}}>{error}</p>}
                        <Email input={email} setInput={setEmail}/>
                        <Password input={password} setInput={setPassword}/>
                        <Submit/>
                        <a href="/signin">Vous n'avez pas de compte ?</a>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LogIn;