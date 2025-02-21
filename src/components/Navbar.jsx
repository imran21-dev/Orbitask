import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import ButtonSc from "./ButtonSc";
import { IoMdLogOut } from "react-icons/io";
import { useContext } from "react";
import { ThemeContext } from "../context/ContextApi";
import fakeUser from '../assets/fakeuser.webp'
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase.config";

const Navbar = () => {
    const {user} = useContext(ThemeContext)

    const handleImageError = (e) => {
        e.target.src = fakeUser
    }
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!"
          }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                .then(() => {
                    Swal.fire({
                      title: "Logged Out",
                      text: "You successfully logged out!",
                      icon: "success"
                    });
                })
            }
          });
    }
    return (
        <nav className="bg-gray-400/10 border-gray-400/20 border-b">
            <section className="w-11/12 mx-auto flex items-center justify-between h-12">
            <Link to='/' className="font-bold text-xl">Orbitask</Link>
            <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded-full text-sm md:text-base font-bold p-1 hover:bg-gray-400/20 duration-200" onClick={handleLogout}><IoMdLogOut className="text-xl"/></button>
            <ThemeButton></ThemeButton>
            <img src={user.photoURL} onError={handleImageError} className="w-5  h-5 md:w-7 md:h-7 rounded-full" />
            </div>
            </section>
            
        </nav>
    );
};

export default Navbar;