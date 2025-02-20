
const Button = ({children}) => {
    return (
       <button className="bg-purple-600 cursor-pointer text-white px-8 py-2 text-sm md:text-base font-bold duration-200 rounded-md hover:bg-purple-700">{children}</button>
    );
};

export default Button;