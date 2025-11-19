import '../../css/LogIn.css'

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