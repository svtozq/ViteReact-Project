import '../../css/SignIn.css'

export default function Submit({ onClick }){
    return <button className="signInSubmit" type="submit" onClick={onClick}> Sign In </button>;
}