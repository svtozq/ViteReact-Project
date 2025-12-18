function LogOut() {
    const handleLogOut = () => {
        localStorage.removeItem("token"); // supprime le token
        globalThis.location.href = "/login";  // redirige vers login
    };

    return (
        <button className="logOutSubmit" type="button" onClick={handleLogOut}> Log Out </button>
    )
}

export default LogOut;