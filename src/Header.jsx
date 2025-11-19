import { Link } from "react-router-dom";
import LogOut from "./identification/LogOut.jsx";

function Header() {
    const token = localStorage.getItem("token");

    return (
        <header>
            <nav>
                {token && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/payment">Payment</Link>
                    </>
                )}
            </nav>

            {token && <LogOut />}
        </header>
    );
}

export default Header;