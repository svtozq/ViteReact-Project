import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState(null);
    const [ setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

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

    // 🔥 Fonction pour ouvrir un nouveau compte
    async function createNewAccount() {
        setLoadingCreate(true);

        const res = await fetch("http://127.0.0.1:8000/Bank/accounts/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });

        const data = await res.json();
        setLoadingCreate(false);

        if (!res.ok) {
            alert(data.detail || "Impossible de créer le compte");
            return;
        }

        // Ajoute le nouveau compte dans la liste
        setAccounts(prev => [...prev, data]);

        alert("Compte créé avec succès !");
        setShowModal(false);
    }

    async function closeAccount(id) {
        if (!window.confirm("Clôturer ce compte ?")) return;

        const res = await fetch(`http://127.0.0.1:8000/Bank/accounts/${id}/close`, {
            method: "PUT",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });

        const data = await res.json();

        if (!res.ok) return alert(data.detail);

        setAccounts(prev => prev.filter(acc => acc.id !== id));
        alert("Compte clôturé !");
    }

    if (!user) return <p>Chargement...</p>;

    return (
        <div className="dashboard-container">

            {/* -------- Modal d’ouverture de compte -------- */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Ouvrir un nouveau compte bancaire</h3>
                        <p>Confirmez-vous la création d’un compte supplémentaire ?</p>

                        <div className="modal-actions">
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
            )}

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

            {/* -------- Liste des comptes -------- */}
            <section className="table-card">
                <h2>Liste des comptes</h2>

                {accounts.length === 0 ? (
                    <p className="empty">Aucun compte trouvé.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>IBAN</th>
                            <th>Solde</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {accounts.map(acc => (
                            <tr key={acc.id}>
                                <td>{acc.id}</td>
                                <td>{acc.iban}</td>
                                <td>{acc.balance}</td>
                                <td>
                                    <div className="table-action">
                                        <Link className="btn-link" to={`/accounts/${acc.id}`}>
                                            Détails
                                        </Link>
                                        <button
                                            className="btn-danger"
                                            onClick={() => closeAccount(acc.id)}
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
