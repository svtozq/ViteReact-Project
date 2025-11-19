import '../css/SignIn.css'
import { useState } from 'react'
import LastName from "./SignIn/LastName.jsx";
import FirstName from "./SignIn/FirstName.jsx";
import Email from "./SignIn/Email.jsx";
import Password from "./SignIn/Password.jsx";
import Submit from "./SignIn/Submit.jsx";

function SignIn() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Bouton qui envoie les données recuperer au back
    function handleSubmit(e) {
        e.preventDefault();

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
            .then(response => response.json())
            .then(result => {
                console.log("Réponse du back :", result);
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
                    <h2>Sign In</h2>
                    <LastName input={lastName} setInput={setLastName}/>
                    <FirstName input={firstName} setInput={setFirstName}/>
                    <Email input={email} setInput={setEmail}/>
                    <Password input={password} setInput={setPassword}/>
                    <Submit onClick={handleSubmit}/>
                    <a href="/login">Vous avez déjà un compte ?</a>
                </form>
                </div>
            </div>

        </>
    );
}

export default SignIn;