import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import ButtonSc from "./ButtonSc";
import { IoMdLogOut } from "react-icons/io";
import { useContext } from "react";
import { ThemeContext } from "../context/ContextApi";
import fakeUser from '../assets/fakeuser.webp'

const Navbar = () => {
    const {user} = useContext(ThemeContext)

    const handleImageError = (e) => {
        e.target.src = fakeUser
    }
    return (
        <nav className="bg-gray-400/10 border-gray-400/20 border-b">
            <section className="w-11/12 mx-auto flex items-center justify-between h-12">
            <Link to='/' className="font-bold text-xl">Orbitask</Link>
            <div className="flex items-center gap-2">
            <ButtonSc><IoMdLogOut className="text-xl"/></ButtonSc>
            <ThemeButton></ThemeButton>
            <img src={user.photoURL} onError={handleImageError} className="w-5  h-5 md:w-7 md:h-7 rounded-full" />
            </div>
            </section>
            
        </nav>
    );
};

export default Navbar;