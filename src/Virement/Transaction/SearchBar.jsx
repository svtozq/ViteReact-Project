import '../../css/Payment.css'
import PropTypes from 'prop-types';
export default function SearchBar_somme({query, setQuery}) {
    return (
        <input className={"somme_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="0 €"
        />
    );
}

SearchBar_somme.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};

