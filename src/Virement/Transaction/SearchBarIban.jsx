import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function SearchBarIban({query, setQuery}) {
    return (
        <input className= {"iban_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Numéro..."
        />
    );
}

//validation of Props
SearchBarIban.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
