import { Link } from "react-router-dom";
import signupImage from "../assets/signup.jpg";
import Button from "../components/Button";
import googlrPng from '../assets/google.png'
const Login = () => {
  return (
    <div className="grid grid-cols-4 h-screen">
      <figure className="w-full">
        <img src={signupImage} className="w-full grayscale-100 h-screen object-cover" />
      </figure>

    <div className="col-span-3 px-20 w-2/4 mx-auto py-10 flex flex-col justify-center">
    <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="opacity-80 pt-1 pb-5">Log in and conquer your day—organize, prioritize, and achieve!</p>

        <button className="border w-max flex rounded-full px-4 opacity-90 cursor-pointer items-center gap-1.5 py-1 text-sm md:text-base font-semibold border-gray-500/50"><img src={googlrPng} alt="" className="w-3 h-3 md:h-5 md:w-5" /> Continue with Google</button>

        <div className="text-xs md:text-sm opacity-50 pt-3">------------- or -------------</div>
      <form className="">
        
        <div className="flex flex-col my-3">
          <label htmlFor="email">Email</label>
          <input
            required
            placeholder="Enter your email"
            type="email"
            name="email"
            className="border border-gray-500/50 px-3 focus:outline-none py-1 rounded-md "
          />
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="password">Password</label>
          <input
            required
            placeholder="Password"
            type="password"
            name="password"
            className="border border-gray-500/50 px-3 focus:outline-none py-1 rounded-md "
          />
        </div>

        <Button>Login</Button>
      </form>
      <p className="text-xs md:text-sm pt-2">
        Do not have an account? <Link to="/register" className="font-bold hover:underline">Sign Up</Link>
      </p>

    </div>
    </div>
  );
};

export default Login;
