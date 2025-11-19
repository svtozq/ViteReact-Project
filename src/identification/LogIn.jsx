import '../css/LogIn.css'

function LogIn() {

    return (
        <>
            <div>
                <div className="form-group">
                    <form>
                        <h2>Log In</h2>
                        <input name="email" id="email" type="email" placeholder="Email" /> <br/>
                        <input name="password" id="password" type="password" placeholder="Password" /> <br/>
                        <button type="submit" >Log In</button> <br/>
                        <a href='/src/identification/SignIn.jsx'> <p>Vous n'avez pas de compte ?</p> </a>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LogIn;
