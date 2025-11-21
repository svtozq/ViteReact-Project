import '../../css/Payment.css'
import {useEffect, useState} from "react";
import Button_Submit_Payment from "./Submit_Payment.jsx";
import SearchBar_somme from "./SearchBar.jsx";
import SearchBar_iban from "./SearchBar_iban.jsx";
import Text_note from "./Text_note.jsx";
import Button_history_Payment from "./Button_History_Payment.jsx";
import { useNavigate } from 'react-router-dom';
import SelectAccountType_source from "../Depot_argent/Select_depot_source.jsx";

function Payment() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [amount, setAmount] = useState("");
    const [from_account_id, setFrom_account_id] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [message, setMessage] = useState("");
    const cleanedIBAN = toAccount.replace(/\s+/g, "");
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    // Récupération du token depuis le localStorage
    const token = localStorage.getItem("token");
    console.log("Token de connexion :", token);



    // Charger les comptes de l'utilisateur connecté
    useEffect(() => {
        fetch("http://127.0.0.1:8000/Bank/accounts/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setAccounts(result.accounts);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }, []);

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
            <h2 className="Title">Mes Virements</h2>
            {/* Gestion des erreurs */}
            {errorMessage && <div className="error-banner">{errorMessage}</div>} {/* Bannière */}
            {successMessage && <div className="success-banner">{successMessage}</div>} {/* Message succès */}

                {/* SECTION SOMME */}
                <div className="section">
                    <h2 className="section-label">Somme</h2>
                    <SearchBar_somme query={amount} setQuery={setAmount}/>
                </div>

            {/* Selection du compte source */}
            <div className="section">
                <label className="section-label">Compte source</label>
                <SelectAccountType_source type={from_account_id} setType={setFrom_account_id} accounts={accounts}/>
                <p className="section-label2">
                    Compte sélectionné : {accounts.find(acc => acc.id === parseInt(from_account_id))?.type || "Aucun"}
                </p>
            </div>

            {/* SECTION IBAN */}
            <div className="section">
                <h2 className="section-label">IBAN</h2>
                <SearchBar_iban query={toAccount} setQuery={setToAccount}/>
            </div>

                {/* SECTION NOTE */}
                <div className="section">
                    <h2 className="section-label">Note</h2>
                    <Text_note query={message} setQuery={setMessage}/>
                </div>

            {/* BOUTON */}
            <Button_Submit_Payment onClick={handleSubmit}/>
            <Button_history_Payment onClick={() => navigate('/transaction_historic')} />

        </div>
    );
}


export default Payment;
