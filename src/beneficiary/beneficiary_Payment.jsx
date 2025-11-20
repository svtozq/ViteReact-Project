import '../css/Beneficiary_Payment.css'
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar_somme from "../Virement/Transaction/SearchBar.jsx";
import Text_note from "../Virement/Transaction/Text_note.jsx";

function Beneficiary_Payment() {

    const { iban } = useParams();   // Récupération de l'IBAN depuis l'URL
    const navigate = useNavigate();

    // Champs du formulaire
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // DÉTAILS À ENVOYER AU BACK
    const data = {
        amount: Number(amount),
        message: message,
        iban_account: iban
    };

    function handleSubmit() {
        console.log("Envoi du virement vers :", iban);

        fetch("http://127.0.0.1:8000/transactions/transfer_money_id", {
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

                setTimeout(() => setSuccessMessage(""), 3000);
                console.log("Réponse du back :", result);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="payment-container">

            {/* Messages */}
            {errorMessage && <div className="error-banner">{errorMessage}</div>}
            {successMessage && <div className="success-banner">{successMessage}</div>}

            {/* IBAN FIXE */}
            <div className="section">
                <label className="section-label">IBAN du bénéficiaire</label>
                <input
                    className="iban-display"
                    type="text"
                    value={iban}
                    disabled
                />
            </div>

            {/* MONTANT */}
            <div className="section">
                <label className="section-label" htmlFor="amount">Montant</label>
                <SearchBar_somme query={amount} setQuery={setAmount}/>
            </div>


            {/* NOTE */}
            <div className="section">
                <label className="section-label">Note</label>
                <Text_note query={message} setQuery={setMessage}/>
            </div>

            {/* BOUTONS */}
            <button className="submit-btn" onClick={handleSubmit}>Envoyer</button>
            <button className="history-btn" onClick={() => navigate('/transaction_historic')}>Historique</button>

        </div>
    );
}

export default Beneficiary_Payment;
