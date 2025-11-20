import '../../css/add_beneficiary.css'

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