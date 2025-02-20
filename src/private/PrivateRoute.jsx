import { useContext } from "react";
import { ThemeContext } from "../context/ContextApi";
import logo from '../assets/logo.png'
import imrandev from '../assets/imran-logo.png'
import { Navigate } from "react-router-dom";
const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(ThemeContext)

    if (loading) {
        return <div className="h-screen flex flex-col items-center justify-center">
            <img className="w-8 md:w-15 xl:w-18" src={logo} alt="logo" />
            <h2 className="text-lg md:text-2xl font-bold py-2">Orbitask</h2>

            <div className="text-center absolute bottom-5">
                <h2 className="font-bold ">From</h2>
                <h2 className="flex -mt-1 items-center text-purple-700 font-bold"><img className="w-10 -mr-2" src={imrandev} alt="" /> Imran Developer</h2>
            </div>
        </div>
    }

    if (!user) {
        return <Navigate to='login'></Navigate>
    }

  
    return children
   

};

export default PrivateRoute;