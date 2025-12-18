import PropTypes from 'prop-types';

export default function Button_add_beneficiary({ onClick }){
    return <button className="Button_add_beneficiary" onClick={onClick}> Ajouter </button>;
}

Button_add_beneficiary.propTypes = {
    onClick: PropTypes.func.isRequired,
};

