import '../../css/Money_deposit.css'

export default function SelectAccountType_source({ type, setType, accounts }) {
    return (
        <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">-- Choisir un compte --</option>
            {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                    {acc.type} montant disponible : {acc.balance} €
                </option>
            ))}
        </select>
    );
}


