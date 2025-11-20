import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../css/Transaction_historic.css'
import { useNavigate } from 'react-router-dom';
import Button_back_Payment from "./Back_button_Payment.jsx";


export default function Transaction_historic_details() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();

    // Pour le bon format de date
    function formatDate(dateString) {
        if (!dateString) return "";

        // Convertit "2024-01-20 19:48:00" en "2024-01-20T19:48:00"
        const isoString = dateString.replace(" ", "T") + "Z";

        const date = new Date(isoString);

        return date.toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/transactions/history_id/?id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Erreur ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log("Données reçues :", data); // debug
                if (Array.isArray(data) && data.length > 0) {
                    setTransaction(data[0]);
                } else {
                    setTransaction(null);
                }
            })
            .catch(err => console.error(err));
    }, [id]);


    return (
        <div className="transaction-detail-container">
            <h2 className="Title">VIREMENT DETAILS</h2>

            {!transaction ? (
                <p>Aucune transaction trouvée ou vous n'êtes pas autorisé à la voir.</p>
            ) : (
                <div className="transaction-detail">
                    <p>Montant : {transaction.amount} €</p>
                    <p>Date : {formatDate(transaction.transaction_date)}</p>
                    <p>Compte source :  {transaction.from_account?.type || "Inconnu"}</p>
                    <p>Compte destinataire :  {transaction.last_name} sur {transaction.to_account?.type || "Inconnu"}</p>
                    <p>Note : {transaction.message || "Aucune note"}</p>
                    <p>Statut : VIREMENT EFFECTUE</p>
                </div>
            )}


            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <Button_back_Payment onClick={() => navigate('/transaction_historic')} />
            </div>
        </div>


    );
}


