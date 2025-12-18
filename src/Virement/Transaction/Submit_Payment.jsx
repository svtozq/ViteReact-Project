import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function Button_Submit_Payment({ onClick }){
    return <button className="Button_submit" onClick={onClick}> Valider </button>;
}

Button_Submit_Payment.propTypes = {
    onClick: PropTypes.func.isRequired,
};
