import { useEffect, useState } from "react";
import "../css/AccountDetails.css";
import { useLocation , Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AccountDetails() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");


    //*****   PDF   *************************

    const [loader , setLoader ] = useState(false);

    const downloadPDF = () =>{
        const capture = document.querySelector(".account-card");
        setLoader(true);

        html2canvas(capture).then((canvas)=>{

            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF("p","mm","a4");

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Taille max souhaitée dans le PDF (mm)
            const maxWidth = 120;   // legerement moins large que A4
            const maxHeight = 100;  // moins haut pour éviter l’étirement

            // Calcul du ratio pour garder les proportions
            let ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

            const displayWidth = imgWidth * ratio;
            const displayHeight = imgHeight * ratio;

            // Centrer l'image
            const marginX = (doc.internal.pageSize.getWidth() - displayWidth) / 2;
            const marginY = 20; // marge en haut

            doc.addImage(imgData, "PNG", marginX, marginY, displayWidth, displayHeight);
            setLoader(false);
            doc.save("Relevé_de_compte.pdf")

        })
    }
    //*******************************


    const location = useLocation();
    const accountId = location.state?.accountId;

    useEffect(() => {
        console.log("Token:", localStorage.getItem("token"));
        fetch(`http://127.0.0.1:8000/Bank/account/detail/${accountId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
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
    }, [accountId]);

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
                <Link className="btn btn-blue" to={"/money_deposit"}>
                    Faire un dépôt
                </Link>

                <Link className="btn btn-green" to={"/payment"}>
                    Faire un virement
                </Link>

                <Link className="btn btn-gray" to={`/transaction_historic`}>
                    Voir l'historique
                </Link>
            </div>

            <Link className="btn btn-danger" to="/dashboard">
                Retour au dashboard
            </Link>

            {/*PDF*/}
            <button className={"receip-modal-download-button"}
                    onClick={downloadPDF}
                    disabled={loader!==false}>

                {loader?(
                    <span>Downloading</span>
                ) :(
                    <span>Download</span>
                )}
            </button>
        </div>
    );
}
