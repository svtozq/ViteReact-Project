import '../../css/add_beneficiary.css'

export default function Add_beneficiary_iban({query, setQuery}) {
    return (
        <input className={"iban"}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="IBAN"
        />
    );
}