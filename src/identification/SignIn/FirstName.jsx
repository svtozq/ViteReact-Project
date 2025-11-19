import '../../css/SignIn.css'

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