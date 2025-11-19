import '../../css/SignIn.css'

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