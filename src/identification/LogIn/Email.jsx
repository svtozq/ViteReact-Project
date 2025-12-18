import '../../css/LogIn.css'
import PropTypes from 'prop-types';

export default function Email({input, setInput}) {
    return (
        <input className={"email"}
               type="email"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Email Address"
        />
    );
}
Email.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
};