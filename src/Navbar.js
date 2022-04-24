import "./styles/styles.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="link-container">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/cars" className="nav-link">
                    Cars
                </Link>
                <Link to="/manufacturers" className="nav-link">
                    Manufacturers
                </Link>
            </div>
        </nav>
    );
}
