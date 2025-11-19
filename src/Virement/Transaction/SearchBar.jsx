import '../../css/Payment.css'

export default function SearchBar_somme({query, setQuery}) {
    return (
        <input className={"somme_input"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="0 €"
        />
    );
}

