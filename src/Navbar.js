import "./styles/styles.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="link-container">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/HAL-Forms/cars/1" className="nav-link">
                    Cars
                </Link>
                <Link to="/HAL-Forms/manufacturers" className="nav-link">
                    Manufacturers
                </Link>
                <Link to="/HAL-Forms/car/2" className="nav-link">
                    Single Car
                </Link>
            </div>
        </nav>
    );
}
