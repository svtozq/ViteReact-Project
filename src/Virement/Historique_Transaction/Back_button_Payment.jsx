import '../../css/Payment.css'
import PropTypes from 'prop-types';

export default function ButtonBackPayment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Back </button>;
}

ButtonBackPayment.propTypes = {
    onClick: PropTypes.func.isRequired,
};