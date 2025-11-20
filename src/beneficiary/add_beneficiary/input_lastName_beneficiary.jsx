import '../../css/add_beneficiary.css'

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