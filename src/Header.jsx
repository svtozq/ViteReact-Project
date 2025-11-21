import { Link } from "react-router-dom";
import LogOut from "./identification/LogOut.jsx";
import './css/Header.css'

function Header() {
    const token = localStorage.getItem("token");

    return (
        <header>
            <nav>
                {token && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/payment">Virements</Link>
                        <Link to="/beneficiary">Bénéficiaires</Link>
                        <Link to="/money_deposit">Dépôt d'argents</Link>
                    </>
                )}
            </nav>

            {token && <LogOut />}
        </header>
    );
}

export default Header;