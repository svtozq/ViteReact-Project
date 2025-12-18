import '../../css/SignIn.css'
import PropTypes from 'prop-types';

export default function Password({input, setInput}) {
    return (
        <input className={"password"}
               type="password"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Password"
        />
    );
}
Password.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
};