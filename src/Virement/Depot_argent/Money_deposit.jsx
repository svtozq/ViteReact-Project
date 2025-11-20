import '../../css/Money_deposit.css'
import Button_Submit_Payment from "../Transaction/Submit_Payment.jsx";
import {useEffect,useState} from "react";
import SelectAccountType_source from "./Select_depot_source.jsx";
import SearchBar_somme from "../Transaction/SearchBar.jsx";
import SelectAccountType_destination from "./Select_depot_destination.jsx";


function Money_deposit() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [amount, setAmount] = useState("");
    const [from_account_id, setFrom_account_id] = useState("");
    const [to_account_id, setTo_account_id] = useState("");
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
                setAccounts(result.accounts); // 👈 stocke les comptes
            })
            .catch(error => {
                setErrorMessage("Impossible de charger les comptes.");
            });
    }, []);

    //Bouton qui envoie les données recuperer au back
    function handleSubmit() {
        const data = {
            amount: parseFloat(amount),
            from_account_id: parseInt(from_account_id),
            to_account_id: parseInt(to_account_id),
        };


        fetch("http://127.0.0.1:8000/transactions/add-money", {
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
        <div>

            {/* Gestion des erreurs */}
            {errorMessage && <div className="error-banner">{errorMessage}</div>} {/* Bannière */}
            {successMessage && <div className="success-banner">{successMessage}</div>} {/* Message succès */}

            {/* SECTION SOMME */}
            <div className="section">
                <label className="section-label">Somme</label>
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


            {/* Selection du compte destinataire */}
            <div className="section">
                <label className="section-label">Compte Destinataire</label>
                <SelectAccountType_destination type={to_account_id} setType={setTo_account_id} accounts={accounts}/>
                <p className="section-label2">
                    Compte sélectionné : {accounts.find(acc => acc.id === parseInt(to_account_id))?.type || "Aucun"}
                </p>
            </div>

            {/* BOUTON */}
            <Button_Submit_Payment onClick={handleSubmit}/>
        </div>
    );
}


export default Money_deposit;
