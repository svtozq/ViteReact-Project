import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState(null);
    const [setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [type, setType] = useState("Compte Secondaire");
    const [errorMessage, setErrorMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmData, setConfirmData] = useState(null);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/Bank/accounts/me", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setAccounts(data.accounts);
            })
            .catch(() => setError("Erreur serveur"));
    }, []);

    async function createNewAccount() {
        setErrorMessage("");
        setLoadingCreate(true);

        const res = await fetch("http://127.0.0.1:8000/Bank/accounts/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type })
        });

        const data = await res.json();
        setLoadingCreate(false);

        if (!res.ok) {
            setErrorMessage(data.detail || "Impossible de créer le compte");
            return;
        }

        setAccounts(prev => [...prev, data]);
        setShowModal(false);
    }



    async function closeAccount(id) {
        setErrorMessage(""); // reset erreur

        setConfirmData({ id }); // ouvre le modal
        setShowConfirm(true);

        const res = await fetch(`http://127.0.0.1:8000/Bank/accounts/${id}/close`, {
            method: "PUT",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });

        const data = await res.json();

        if (!res.ok) return alert(data.detail);

        setAccounts(prev => prev.filter(acc => acc.id !== id));
    }

    async function confirmCloseAccount(id) {
        setShowConfirm(false);
        setErrorMessage("");

        const res = await fetch(`http://127.0.0.1:8000/Bank/accounts/${id}/close`, {
            method: "PUT",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });

        const data = await res.json();

        if (!res.ok) {
            setErrorMessage(data.detail || "Erreur lors de la clôture");
            return;
        }

        setAccounts(prev => prev.filter(acc => acc.id !== id));
    }


    if (!user) return <p>Chargement...</p>;

    return (
        <div className="dashboard-container">

            {/* -------- Infos utilisateur -------- */}
            <div className="user-card">
                <h2>Bienvenue</h2>
                <div className="user-info">
                    <p><strong>{user.first_name} {user.last_name}</strong></p>
                    <p>Email : {user.email}</p>
                </div>
            </div>

            {/* -------- Actions rapides -------- */}
            <section>
                <h2>Actions rapides</h2>
                <div className="actions">
                    <button className="btn btn-blue" onClick={() => setShowModal(true)}>
                        Ouvrir un compte
                    </button>
                    <Link to="/history" className="btn btn-gray">Voir l'historique</Link>
                </div>
            </section>

            {/* -------- Modal d’ouverture de compte -------- */}
            {showModal && (
                <section className="table-card">
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Ouvrir un nouveau compte bancaire</h3>
                            <p>Quel type de compte bancaire souhaitez vous ouvrir ?</p>

                            <div className="modal-actions">
                                <select value={type} onChange={e => setType(e.target.value)}>
                                    <option value="Livret A">Livret A</option>
                                    <option value="Livret B">Livret B</option>
                                    <option value="Livret Jeune">Livret Jeune</option>
                                </select>
                                <button
                                    className="btn btn-blue"
                                    onClick={createNewAccount}
                                    disabled={loadingCreate}
                                >
                                    {loadingCreate ? "Création..." : "Valider"}
                                </button>
                                <button className="btn btn-gray" onClick={() => setShowModal(false)}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {showConfirm && (
                <section className="table-card">
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Clôturer le compte</h3>
                            <p>Êtes-vous sûr de vouloir clôturer ce compte ?</p>

                            <div className="modal-actions">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => confirmCloseAccount(confirmData.id)}
                                >
                                    Confirmer
                                </button>

                                <button
                                    className="btn btn-gray"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* -------- Liste des comptes -------- */}
            <section className="table-card">
                <h2>Liste des comptes</h2>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                {accounts.length === 0 ? (
                    <p className="empty">Aucun compte trouvé.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>TYPE</th>
                            <th>IBAN</th>
                            <th>Solde</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>

                        <tbody>
                        {accounts.map(acc => (
                            <tr key={acc.id}>
                                <td>{acc.id}</td>
                                <td>{acc.type}</td>
                                <td>{acc.iban}</td>
                                <td>{acc.balance}</td>
                                <td>
                                    <div className="table-action">
                                        <Link className="btn-link" to={`/accounts/${acc.id}`}>
                                            Détails
                                        </Link>
                                        <button
                                            className="btn-danger"
                                            onClick={() => {setConfirmData(acc);
                                                setShowConfirm(true);
                                            }}
                                        >
                                            Clôturer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>

        </div>
    );
}
