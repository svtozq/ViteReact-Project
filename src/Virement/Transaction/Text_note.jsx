import '../../css/Payment.css'


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