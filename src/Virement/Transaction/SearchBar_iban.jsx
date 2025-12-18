import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function SearchBar_iban({query, setQuery}) {
    return (
        <input className= {"iban_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Numéro..."
        />
    );
}

//validation of Props
SearchBar_iban.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
