import '../../css/Payment.css'
import PropTypes from 'prop-types';


export default function Text_note({query, setQuery}) {
    return (
        <textarea
            className="note_text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Text input"
            rows="4">
        </textarea>
    );
}

Text_note.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};

