import '../../css/add_beneficiary.css'
import PropTypes from 'prop-types';
import SearchBar_somme from "../../Virement/Transaction/SearchBar.jsx";
export default function Add_beneficiary_firstName({query, setQuery}) {
    return (
        <input className={"firstname"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Prénom"
        />
    );
}

Add_beneficiary_firstName.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
