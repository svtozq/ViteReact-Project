import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function ButtonHistoryPayment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Historique </button>;
}

ButtonHistoryPayment.propTypes = {
    onClick: PropTypes.func.isRequired,
};
