import '../css/beneficiary.css'
import PropTypes from 'prop-types';
import Button_add_beneficiary from "./add_beneficiary/button_add_beneficiary.jsx";


export default function Add_button_beneficiary({ onClick }){
    return <button className="add_button_beneficiary btn-green" onClick={onClick}> Ajouter </button>;
}

Add_button_beneficiary.propTypes = {
    onClick: PropTypes.func.isRequired,
};