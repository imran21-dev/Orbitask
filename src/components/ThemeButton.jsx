import { useTheme } from "next-themes";
import { IoIosPartlySunny } from "react-icons/io";
import { FaCloudMoon } from "react-icons/fa";


const ThemeButton = () => {
    const {theme, setTheme} = useTheme()
    
    return (
        <button
     
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <IoIosPartlySunny className="w-5 h-5" /> : <FaCloudMoon className="w-5 h-5" />}
    </button>
    );
};

export default ThemeButton;