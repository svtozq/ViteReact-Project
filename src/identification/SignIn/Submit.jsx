import '../../css/SignIn.css'
import PropTypes from 'prop-types';

export default function Submit({ onClick }){
    return <button className="signInSubmit" type="submit" onClick={onClick}> Sign In </button>;
}

Submit.propTypes = {
    onClick: PropTypes.func.isRequired,
};