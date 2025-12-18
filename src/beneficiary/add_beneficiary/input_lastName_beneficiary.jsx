import PropTypes from 'prop-types';

export default function AddBeneficiaryLastName({query, setQuery}) {
    return (
        <input className={"lastname"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Nom de Famille"
        />
    );
}

AddBeneficiaryLastName.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
