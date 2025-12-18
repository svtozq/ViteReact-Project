import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function Button_history_Payment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Historique </button>;
}

Button_history_Payment.propTypes = {
    onClick: PropTypes.func.isRequired,
};
