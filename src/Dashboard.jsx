import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function loadAccounts() {
            setError("");

            fetch("http://127.0.0.1:8000/Bank/accounts/me", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data.user);      // <--- Ajout
                    setAccounts(data.accounts);
                })
                .catch(() => {
                    console.log("Erreur");
                });

        }

        loadAccounts();
    }, []);

    if (error) {
        return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
    }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1>Dashboard</h1>

            <h2>Liste des comptes</h2>
            <p>Nom : <strong>{user.first_name} {user.last_name}</strong></p>
            <p>Email : <strong>{user.email}</strong></p>


            {accounts.length === 0 ? (
                <p>Aucun compte trouvé.</p>
            ) : (

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>IBAN</th>
                        <th>Solde</th>
                        <th>Clôturé ?</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map(acc => (
                        <tr key={acc.id}>
                            <td>{acc.id}</td>
                            <td>{acc.iban}</td>
                            <td>{acc.balance}</td>
                            <td>{acc.clotured ? "Oui" : "Non"}</td>
                            <td><Link to={`/accounts/${acc.id}`}>Voir</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
