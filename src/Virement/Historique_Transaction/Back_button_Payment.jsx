import '../../css/Payment.css'
import PropTypes from 'prop-types';

export default function Button_back_Payment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Back </button>;
}

Button_back_Payment.propTypes = {
    onClick: PropTypes.func.isRequired,
};