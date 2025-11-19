// src/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAccounts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("http://127.0.0.1:8000/Bank/all_accounts/");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des comptes");
                }
                const data = await response.json();
                setAccounts(data);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les comptes.");
            } finally {
                setLoading(false);
            }
        }

        loadAccounts();
    }, []);

    if (loading) {
        return <p style={{ padding: "2rem" }}>Chargement du tableau de bord...</p>;
    }

    if (error) {
        return (
            <p style={{ padding: "2rem", color: "red" }}>
                {error}
            </p>
        );
    }

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "1rem 1rem 3rem",
                fontFamily: "sans-serif",
            }}
        >
            {/* Bloc infos utilisateur (mocké pour l'instant) */}
            <section style={{ marginBottom: "2rem" }}>
                <h1>Dashboard</h1>
                <p>
                    Nom : <strong>Utilisateur démo</strong>
                </p>
                <p>
                    Email : <strong>demo@example.com</strong>
                </p>
            </section>

            {/* Actions rapides */}
            <section style={{ marginBottom: "2rem" }}>
                <h2>Actions rapides</h2>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link to="/open-account">Ouvrir un nouveau compte</Link>
                    <Link to="/history">Voir l&apos;historique</Link>
                </div>
            </section>

            {/* Liste des comptes */}
            <section>
                <h2>Liste des comptes</h2>

                {accounts.length === 0 ? (
                    <p>Aucun compte trouvé.</p>
                ) : (
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "1rem",
                        }}
                    >
                        <thead>
                        <tr>
                            <th
                                style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                            >
                                ID
                            </th>
                            <th
                                style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                            >
                                IBAN
                            </th>
                            <th
                                style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                            >
                                Solde
                            </th>
                            <th
                                style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                            >
                                Clôturé ?
                            </th>
                            <th
                                style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td style={{ padding: "0.5rem 0" }}>{account.id}</td>
                                <td>{account.iban}</td>
                                <td>{account.balance}</td>
                                <td>{account.clotured ? "Oui" : "Non"}</td>
                                <td>
                                    {/* Lien vers détail d’un compte (front) */}
                                    <Link to={`/accounts/${account.id}`}>Détail</Link>
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
