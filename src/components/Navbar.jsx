import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";


const Navbar = () => {
    return (
        <nav>
            <Link to='/' className="font-bold text-xl">Orbitask</Link>
            <Link>Log Out</Link>
            <ThemeButton></ThemeButton>
        </nav>
    );
};

export default Navbar;