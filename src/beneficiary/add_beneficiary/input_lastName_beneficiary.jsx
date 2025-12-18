import PropTypes from 'prop-types';

export default function Add_beneficiary_lastName({query, setQuery}) {
    return (
        <input className={"lastname"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Nom de Famille"
        />
    );
}

Add_beneficiary_lastName.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
