import '../../css/SignIn.css'

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