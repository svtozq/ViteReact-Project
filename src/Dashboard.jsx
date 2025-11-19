import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/Bank/accounts/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("Erreur API");
                return response.json();
            })
            .then(data => {
                setUser(data.user);
                setAccounts(data.accounts);
            })
            .catch(() => {
                setError("Impossible de récupérer les comptes.");
            });


    }, []);


    if (error) {
        return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
    }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1>Dashboard</h1>

            {user && (
                <>
                    <p>Nom : <strong>{user.first_name} {user.last_name}</strong></p>
                    <p>Email : <strong>{user.email}</strong></p>
                </>
            )}

            <h2>Liste des comptes</h2>

            {Array.isArray(accounts) && accounts.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>IBAN</th>
                        <th>Solde</th>
                        <th>Clôturé</th>
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
                            <td><Link to={'/accounts/${acc.id}'}>Voir</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun compte trouvé.</p>
            )}
        </div>
    );
}