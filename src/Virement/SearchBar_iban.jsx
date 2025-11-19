import './Payment.css'


export default function SearchBar_iban({query, setQuery}) {
    return (
        <input className= {"iban_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Numéro..."
        />
    );
}