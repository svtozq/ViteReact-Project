import PropTypes from 'prop-types';

export default function AddBeneficiaryIban({query, setQuery}) {
    return (
        <input className={"iban"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="IBAN"
        />
    );
}

AddBeneficiaryIban.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
