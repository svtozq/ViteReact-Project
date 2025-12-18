import PropTypes from 'prop-types';

export default function Add_beneficiary_iban({query, setQuery}) {
    return (
        <input className={"iban"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="IBAN"
        />
    );
}

Add_beneficiary_iban.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
