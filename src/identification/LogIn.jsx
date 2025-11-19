import '../css/LogIn.css'
import { useState } from 'react'
import Email from "./LogIn/Email.jsx";
import Password from "./LogIn/Password.jsx";
import Submit from "./LogIn/Submit.jsx";
import LogOut from "./LogOut.jsx";
import { Navigate } from "react-router-dom";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            .then(result => {
                console.log("Réponse du back :", result);
                if (result.token) {
                    localStorage.setItem("token", result.token); // ✅ Stockage
                    window.location.href = "/payment";  // redirige vers login
                } else {
                    alert("Email ou mot de passe incorrect");
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
    }

    return (
        <>
            <div>
                <div className="form-group">
                    <form>
                        <h2>Log In</h2>
                        <Email input={email} setInput={setEmail}/>
                        <Password input={password} setInput={setPassword}/>
                        <Submit onClick={handleSubmit}/>
                        <a href="/signin">Vous n'avez pas de compte ?</a>
                    </form>
                </div>
            </div>
            <LogOut />
        </>
    );
}

export default LogIn;