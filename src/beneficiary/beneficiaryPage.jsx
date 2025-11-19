
import "../beneficiary/beneficiary.css";
import { useEffect, useState } from "react";
import Button_Submit_Payment from "../Virement/Submit_Payment.jsx";
import Add_button_beneficiary from "./add_button_beneficiary.jsx";
import History_button_beneficiary from "./history_button_beneficiary.jsx";


function BeneficiaryPage() {
    const [beneficiary, setBeneficiaries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/beneficiary/my")
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.detail || "Erreur lors du chargement");
                    });
                }
                return res.json();
            })
            .then(data => {
                setBeneficiaries(data.beneficiary || []);
                setSuccessMessage("Bénéficiaires chargés avec succès !");
                setTimeout(() => setSuccessMessage(""), 3000);
                setLoading(false);
            })
            .catch(err => {
                setErrorMessage(err.message || "Une erreur est survenue");
                setLoading(false);
            });
    }, []);





    if (loading) return <p>Chargement…</p>;


    return (

        <main className="beneficiaries-page">


            {errorMessage && <div className="error-banner">{errorMessage}</div>}
            {successMessage && <div className="success-banner">{successMessage}</div>}

            <header className="beneficiaries-header">
                <h1>Bénéficiaires</h1>
            </header>

            <div className="beneficiary-content">
                {beneficiary.length === 0 ? (
                    <p>Aucun bénéficiaire trouvé.</p>
                ) : (
                    beneficiary.map(b => (
                        <div key={b.id} className="beneficiary-item">
                            {b.first_name} {b.last_name} — {b.iban}
                        </div>
                    ))
                )}
            </div>

            <div className="beneficiary-footer">
                Total de bénéficiaires : {beneficiary.length}
            </div>

            <Add_button_beneficiary onClick={BeneficiaryPage}/>

            <History_button_beneficiary onClick={BeneficiaryPage}/>

        </main>

    );
}


export default BeneficiaryPage;