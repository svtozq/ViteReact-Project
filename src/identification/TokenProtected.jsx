import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function isTokenExpired(token) {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    localStorage.removeItem(token);

    // exp est en secondes → on compare au timestamp actuel
    return Date.now() >= exp * 1000;
}

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};