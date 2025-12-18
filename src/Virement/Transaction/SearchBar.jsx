import '../../css/Payment.css'
import PropTypes from 'prop-types';
export default function SearchBarSomme({query, setQuery}) {
    return (
        <input className={"somme_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="0 €"
        />
    );
}

SearchBarSomme.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};

