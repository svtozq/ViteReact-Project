function LogOut() {
    const handleLogOut = () => {
        localStorage.removeItem("token"); // supprime le token
        window.location.href = "/login";  // redirige vers login
    };

    return (
        <button className="logOutSubmit" type="button" onClick={handleLogOut}> Log Out </button>
    )
}

export default LogOut;