
import "../css/beneficiary.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Add_button_beneficiary from "./add_button_beneficiary.jsx";
import Button_back_Payment from "../Virement/Historique_Transaction/Back_button_Payment.jsx";



function BeneficiaryPage() {
    const [beneficiary, setBeneficiaries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    //token
    const token = localStorage.getItem("token");
    console.log("Token de connexion :", token);


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

        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErrorMessage("utilisateur non connecté");
            setLoading(false);
            return;
        }

        fetch("http://127.0.0.1:8000/beneficiary/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.detail || "Erreur lors du chargement");
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log("donnée recu");

                setBeneficiaries(Array.isArray(data.beneficiaries) ? data.beneficiaries : []);

                setSuccessMessage("Bénéficiaires chargés avec succès");
                setTimeout(() => setSuccessMessage(""), 3000);
                setLoading(false);
            })
            .catch(err => {
                setErrorMessage(err.message || "Une erreur est survenue");
                setLoading(false);
            });
    }, [token]);


    if (loading) return <p>Chargement…</p>;


    return (

        <main className="beneficiaries-page">


            {errorMessage && <div className="error-banner">{errorMessage}</div>}
            {successMessage && <div className="success-banner">{successMessage}</div>}

            <header className="beneficiaries-header">
                <h1>Bénéficiaires</h1>
            </header>

            <div  className="beneficiary-content">
                {beneficiary.length === 0 ? (
                    <p>Aucun bénéficiaire trouvé.</p>
                ) : (
                    beneficiary.map(b => (
                        <div key={b.id} className="beneficiary-item"
                             onClick={() => navigate(`/beneficiary_Payment/${b.bank_account.iban}`)}//Pour recuperer l'id de la transaction en question
                             style={{ cursor: "pointer" }}>
                            {b.first_name} {b.last_name} — {b.bank_account.iban} - {formatDate(b.Beneficiary_date)}
                        </div>
                    ))
                )}
            </div>

            <div className="beneficiary-footer">
                Total de bénéficiaires : {beneficiary.length}
            </div>

            <Add_button_beneficiary onClick={() => navigate('/add_beneficiary')} />


        </main>

    );
}


export default BeneficiaryPage;