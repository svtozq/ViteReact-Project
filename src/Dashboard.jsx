import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Dashboard.jsx
// Composant React autonome qui fonctionne sans backend (fallback mock)
// Utilise TailwindCSS pour le style (aucune importation nécessaire ici)

const MOCK_USER = {
    id: "user_1",
    nom: "Jean Dupont",
    email: "jean.dupont@example.com",
};

const MOCK_ACCOUNTS = [
    { id: "acc_001", type: "Courant", solde: 1245.5 },
    { id: "acc_002", type: "Epargne", solde: 10350.0 },
    { id: "acc_003", type: "Crédit", solde: -2500.25 },
];

// getAccounts essaie de récupérer depuis l'API puis, si échec, renvoie des données mock.
// Cette approche permet de développer le front sans backend.
async function getAccounts({ useMock = false } = {}) {
    if (useMock) {
        // Simule un délai réseau
        await new Promise((r) => setTimeout(r, 350));
        return { success: true, data: MOCK_ACCOUNTS };
    }

    try {
        const res = await fetch("/api/accounts", { method: "GET" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        return { success: true, data };
    } catch (err) {
        // fallback: mock
        console.warn("getAccounts: fetch failed, using mock data ->", err.message);
        return { success: false, data: MOCK_ACCOUNTS, error: err };
    }
}

export default function Dashboard({ user = null, forceMock = false }) {
    // -- state
    const [currentUser] = useState(user ?? MOCK_USER);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            setError(null);
            const resp = await getAccounts({ useMock: forceMock });
            if (!mounted) return;

            if (resp.success) {
                setAccounts(Array.isArray(resp.data) ? resp.data : []);
            } else {
                // still set mock data so UI is usable
                setAccounts(Array.isArray(resp.data) ? resp.data : []);
                setError(resp.error?.message || "Impossible de charger les comptes (mode mock activé)");
            }
            setLoading(false);
        }

        load();
        return () => {
            mounted = false;
        };
    }, [forceMock]);

    // utilitaires
    const formatEuros = (n) => {
        return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
    };




    return (
        <div className="max-w-5xl mx-auto p-6">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Tableau de bord</h1>
                    <p className="text-sm text-gray-500">Vue d'ensemble de vos comptes et actions rapides</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/accounts/new"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    >
                        Ouvrir un nouveau compte
                    </Link>

                    <Link
                        to="/history"
                        className="inline-block px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        Historique
                    </Link>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl shadow">
                    <h2 className="text-lg font-medium mb-2">Informations utilisateur</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
                            {currentUser.nom?.charAt(0) ?? "U"}
                        </div>
                        <div>
                            <div className="font-semibold">{currentUser.nom}</div>
                            <div className="text-sm text-gray-500">{currentUser.email}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-sm text-gray-600">Total (estimé)</h3>
                    <p className="text-2xl font-semibold mt-2">
                        {formatEuros(accounts.reduce((s, a) => s + (a?.solde || 0), 0))}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Solde cumulé de tous vos comptes affichés</p>
                </div>
            </section>

            <section className="bg-white p-4 rounded-2xl shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Mes comptes</h2>
                    <div className="text-sm text-gray-500">{loading ? "Chargement..." : `${accounts.length} comptes`}</div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-yellow-700 rounded">
                        Erreur de chargement : {String(error)} — affichage en mode mock.
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="text-left text-sm text-gray-500 border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Solde</th>
                            <th className="py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-400">
                                    Chargement des comptes...
                                </td>
                            </tr>
                        ) : accounts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-500">
                                    Aucun compte trouvé.
                                </td>
                            </tr>
                        ) : (
                            accounts.map((acc) => (
                                <tr key={acc.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">{acc.id}</td>
                                    <td className="py-3">{acc.type}</td>
                                    <td className="py-3 font-medium">{formatEuros(acc.solde)}</td>
                                    <td className="py-3">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/accounts/${encodeURIComponent(acc.id)}`}
                                                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                                            >
                                                Détail
                                            </Link>

                                            <Link
                                                to={`/accounts/${encodeURIComponent(acc.id)}/transactions`}
                                                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                                            >
                                                Historique
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className="mt-6 text-sm text-gray-400">Petite note: développez avec <code>forceMock</code> si votre backend n'est pas encore prêt (ex: &lt;Dashboard forceMock={true} /&gt;).</footer>
        </div>
    );
}






