
import "../beneficiary/beneficiary.css";
import { useEffect, useState } from "react";

function BeneficiaryPage() {
    const [beneficiary, setBeneficiaries] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/beneficiary/my")
            .then(res => res.json())
            .then(data => {
                setBeneficiaries(data.beneficiary); //
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);





    if (loading) return <p>Chargement…</p>;
    if (!beneficiary || beneficiary.length === 0) return <p>Aucun bénéficiaire trouvé.</p>;


    return (

        <main className="beneficiaries-page">
            <header className="beneficiaries-header">
                <h1>Mes bénéficiaires</h1>
            </header>

            <div className="beneficiary-content">
                {beneficiary.map(b => (
                    <div key={b.id} className="beneficiary-item">
                        {b.first_name} {b.last_name} — {b.iban}
                    </div>
                ))}
            </div>

            <div id="footer" className="beneficiary-footer">
                Total de bénéficiaires : 654654
            </div>

            <div className="beneficiary-footer">
                Total de bénéficiaires : {beneficiary.length}
            </div>

            <button className="add-btn">
                Ajouter un bénéficiaire
            </button>
        </main>

    );
}


export default BeneficiaryPage;