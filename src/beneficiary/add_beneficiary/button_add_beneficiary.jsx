import PropTypes from 'prop-types';

export default function ButtonAddBeneficiary({ onClick }){
    return <button className="Button_add_beneficiary" onClick={onClick}> Ajouter </button>;
}

ButtonAddBeneficiary.propTypes = {
    onClick: PropTypes.func.isRequired,
};

