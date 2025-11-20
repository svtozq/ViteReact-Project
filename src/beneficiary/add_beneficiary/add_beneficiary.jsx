import '../../css/add_beneficiary.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Add_beneficiary_iban from "./input_iban_beneficiary.jsx";
import Add_beneficiary_firstName from "./input_firstName_beneficiary.jsx";
import Button_add_beneficiary from "./button_add_beneficiary.jsx";
import Button_back_Payment from "../../Virement/Historique_Transaction/Back_button_Payment.jsx";
import Add_beneficiary_lastName from "./input_lastName_beneficiary.jsx";


function Add_beneficiary() {
    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [iban, setiban] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


//Bouton qui envoie les données recuperer au back
    function handleSubmit() {
        const data = {
            first_name: name,
            last_name: lastName,
            beneficiary_iban: iban,
        };

        fetch("http://127.0.0.1:8000/beneficiary/", {
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

            {/* Gestion des erreurs */}
            {errorMessage && <div className="error-banner">{errorMessage}</div>} {/* Bannière */}
            {successMessage && <div className="success-banner">{successMessage}</div>} {/* Message succès */}

            {/* SECTION IBAN */}
            <div className="section">
                <label className="section-label">IBAN</label>
                <Add_beneficiary_iban query={iban} setQuery={setiban}/>
            </div>

            {/* SECTION NAME */}
            <div className="section">
                <label className="section-label">Note</label>
                <Add_beneficiary_firstName query={name} setQuery={setname}/>
                <Add_beneficiary_lastName query={lastName} setQuery={setlastName}/>
            </div>

            {/* BOUTON */}
            <Button_add_beneficiary onClick={handleSubmit}/>
            <Button_back_Payment onClick={() => navigate('/beneficiary')} />


        </div>
    );

}

export default Add_beneficiary;
