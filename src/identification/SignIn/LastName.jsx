import '../../css/SignIn.css'
import PropTypes from 'prop-types';

export default function LastName({input, setInput}) {
    return (
        <input className={"lastname"}
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Last Name"
        />
    );
}
LastName.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
};