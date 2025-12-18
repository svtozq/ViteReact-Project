import { useState, useEffect } from 'react';
import '../../css/Transaction_historic.css'
import { useNavigate } from 'react-router-dom';
import Button_back_Payment from "./Back_button_Payment.jsx";


// Pour le bon format de date
function formatDate(dateString) {
    if (!dateString) return "";

    // Convertitt "2024-01-20 19:48:00" en "2024-01-20T19:48:00"
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

export default function Transaction_historic() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://127.0.0.1:8000/transactions/history/", {
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
                setTransactions(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div>
            <h2 className="Title">Mes Transactions</h2>
            <div className="transaction-list">
                {transactions.map((t, index) => (
                    <div key={index} className="transaction-item"
                         onClick={() => navigate(`/transaction_historic_details/${t.id}`)}  //Pour recuperer l'id de la transaction en question
                         style={{ cursor: "pointer" }}>
                        <div className="transaction-header">
                            <span className="transaction-mss"> Virement effectué à : {t.sender_first_name}</span>
                            <span className="transaction-amount">{t.amount} €</span>
                        </div>
                        <div className="transaction-sub">
                            <span>{formatDate(t.transaction_date)}</span>
                            <span className="status"> VIREMENT </span>
                            <span className="arrow">{'>'}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Button_back_Payment onClick={() => navigate(-1)} />
        </div>
    );
}


