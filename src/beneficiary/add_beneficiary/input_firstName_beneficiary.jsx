import '../../css/add_beneficiary.css'
import PropTypes from 'prop-types';
export default function AddBeneficiaryFirstName({query, setQuery}) {
    return (
        <input className={"firstname"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Prénom"
        />
    );
}

AddBeneficiaryFirstName.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
