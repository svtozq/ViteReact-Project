import '../../css/Money_deposit.css'
import PropTypes from 'prop-types';

export default function SelectAccountTypeSource({ type, setType, accounts }) {
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

SelectAccountTypeSource.propTypes = {
    type: PropTypes.string.isRequired,
    setType: PropTypes.func.isRequired,
    accounts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            type: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        })
    ).isRequired,
};


