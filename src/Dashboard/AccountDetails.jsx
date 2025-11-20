import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/AccountDetails.css";

export default function AccountDetails() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/Bank/accounts/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.detail) {
                    setError(data.detail);
                    return;
                }
                setAccount(data);
            })
            .catch(() => setError("Erreur serveur"));
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!account) return <p>Chargement...</p>;

    return (
        <div className="account-details-container">

            <h2>Détail du compte</h2>

            <div className="account-card">
                <p><strong>Numéro de compte (ID) :</strong> {account.id}</p>
                <p><strong>IBAN :</strong> {account.iban}</p>
                <p><strong>Type :</strong> {account.type}</p>
                <p><strong>Solde :</strong> {account.balance} €</p>
                <p><strong>Date d'ouverture :</strong> {new Date(account.opened_at).toLocaleString()}</p>
            </div>

            <div className="actions">
                <Link className="btn btn-blue" to={`/deposit/${id}`}>
                    Faire un dépôt
                </Link>

                <Link className="btn btn-green" to={`/transfer/${id}`}>
                    Faire un virement
                </Link>

                <Link className="btn btn-gray" to={`/history/${id}`}>
                    Voir l'historique
                </Link>
            </div>

            <Link className="btn btn-back" to="/dashboard">
                Retour au dashboard
            </Link>
        </div>
    );
}
