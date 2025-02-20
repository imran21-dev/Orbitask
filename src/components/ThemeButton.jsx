import { useTheme } from "next-themes";
import { IoIosPartlySunny } from "react-icons/io";
import { FaCloudMoon } from "react-icons/fa";
import ButtonSc from "./ButtonSc";


const ThemeButton = () => {
    const {theme, setTheme} = useTheme()
    
    return (
        <button
     className="cursor-pointer rounded-full text-sm md:text-base font-bold p-1 hover:bg-gray-400/20 duration-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <IoIosPartlySunny className="text-xl"/> : <FaCloudMoon className="text-xl" />}
    </button>
    );
};

export default ThemeButton;