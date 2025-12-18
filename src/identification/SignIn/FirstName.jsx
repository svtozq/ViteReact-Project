import '../../css/SignIn.css'
import PropTypes from 'prop-types';

export default function FirstName({input, setInput}) {
    return (
        <input className={"firstname"}
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="First Name"
        />
    );
}
FirstName.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
};