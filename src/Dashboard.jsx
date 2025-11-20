import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState(null);
    const [setError] = useState("");

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

            <div className="user-card">
                <h2>Bienvenue</h2>
                <div className="user-info">
                    <p><strong>{user.first_name} {user.last_name}</strong></p>
                    <p>Email : {user.email}</p>
                </div>
            </div>

            <section>
                <h2>Actions rapides</h2>
                <div className="actions">
                    <Link to="/open-account" className="btn btn-blue">Ouvrir un compte</Link>
                    <Link to="/history" className="btn btn-gray">Voir l'historique</Link>
                </div>
            </section>

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
                                            Voir
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
