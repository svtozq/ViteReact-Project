export default function BeneficiaryCard({ beneficiary }) {

    const { name, iban_beneficiary, date_added } = beneficiary;

    return (

        <div>
            <h2> {name} </h2>
            <p>IBAN : {iban_beneficiary}</p>
            <p>date d'ajout : {date_added}</p>
        </div>
    );
}