import '../css/Beneficiary_Payment.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import SearchBar_somme from "../Virement/Transaction/SearchBar.jsx";
import Text_note from "../Virement/Transaction/Text_note.jsx";
import SelectAccountType_source from "../Virement/Depot_argent/Select_depot_source.jsx";

function Beneficiary_Payment() {

    const { iban } = useParams();   // Récupération de l'IBAN depuis l'URL
    const navigate = useNavigate();

    // Champs du formulaire
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [from_account_id, setFrom_account_id] = useState("");
    const [accounts, setAccounts] = useState([]);

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

    // DÉTAILS À ENVOYER AU BACK
    const data = {
        amount: Number(amount),
        message: message,
        from_account_id: Number.parseInt(from_account_id),
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

            {/* Selection du compte source */}
            <div className="section">
                <label className="section-label">Compte source</label>
                <SelectAccountType_source type={from_account_id} setType={setFrom_account_id} accounts={accounts}/>
                <p className="section-label2">
                    Compte sélectionné : {accounts.find(acc => acc.id === Number.parseInt(from_account_id))?.type || "Aucun"}
                </p>
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
