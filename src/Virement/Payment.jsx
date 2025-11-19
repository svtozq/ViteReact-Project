import './Payment.css'
import { useState } from "react";
import Button_Submit_Payment from "./Submit_Payment.jsx";
import SearchBar_somme from "./SearchBar.jsx";
import SearchBar_iban from "./SearchBar_iban.jsx";
import Text_note from "./Text_note.jsx";

function Payment() {
    const [amount, setAmount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [message, setMessage] = useState("");
    const cleanedIBAN = toAccount.replace(/\s+/g, "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    //Bouton qui envoie les données recuperer au back
    function handleSubmit() {
        const data = {
            amount: parseFloat(amount),
            to_account_id: cleanedIBAN,
            message: message
        };

        console.log("IBAN envoyé au back :", toAccount);

        fetch("http://127.0.0.1:8000/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.detail);
                    });
                }
                return response.json();
            })
            .then(result => {
                setSuccessMessage(result.message);
                setErrorMessage("");

                setTimeout(() => {
                    setSuccessMessage(""); // efface le toast après 3s
                }, 3000);
                console.log("Réponse du back :", result);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="payment-container">

            {/* Gestion des erreurs */}
            {errorMessage && <div className="error-banner">{errorMessage}</div>} {/* Bannière */}
            {successMessage && <div className="success-banner">{successMessage}</div>} {/* Message succès */}

            {/* SECTION SOMME */}
            <div className="section">
                <label className="section-label">Somme</label>
                <SearchBar_somme query={amount} setQuery={setAmount}/>
            </div>

            {/* SECTION IBAN */}
            <div className="section">
                <label className="section-label">IBAN</label>
                <SearchBar_iban query={toAccount} setQuery={setToAccount}/>
            </div>

            {/* SECTION NOTE */}
            <div className="section">
                <label className="section-label">Note</label>
                <Text_note query={message} setQuery={setMessage}/>
            </div>

            {/* BOUTON */}
            <Button_Submit_Payment onClick={handleSubmit}/>

        </div>
    );
}


export default Payment;
