import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function ButtonSubmitPayment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Valider </button>;
}

ButtonSubmitPayment.propTypes = {
    onClick: PropTypes.func.isRequired,
};
