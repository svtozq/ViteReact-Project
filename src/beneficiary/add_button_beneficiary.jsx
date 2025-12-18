import '../css/beneficiary.css'
import PropTypes from 'prop-types';
import ButtonAddBeneficiary from "./add_beneficiary/button_add_beneficiary.jsx";


export default function AddButtonBeneficiary({ onClick }){
    return <button className="add_button_beneficiary btn-green" onClick={onClick}> Ajouter </button>;
}

AddButtonBeneficiary.propTypes = {
    onClick: PropTypes.func.isRequired,
};