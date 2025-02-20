import { Link } from "react-router-dom";
import signupImage from "../assets/signup.jpg";
import Button from "../components/Button";
import googlrPng from "../assets/google.png";
import { useContext } from "react";
import { ThemeContext } from "../context/ContextApi";
import { updateProfile } from "firebase/auth";
import { auth } from "../context/firebase.config";
const Register = () => {
  const {signUp} = useContext(ThemeContext)

    const handleSignUp = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        signUp(email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name
          })
          .then(() => {
            console.log('signd')
          })
          .catch((error) => {
            console.log(error)
          })
        })
        .catch((error) => {
          console.log(error.code)
        })
    }
  return (
    <div className="grid grid-cols-4 h-screen">
      <figure className="w-full">
        <img
          src={signupImage}
          className="w-full grayscale-100 h-screen object-cover"
        />
      </figure>

      <div className="col-span-3 px-20 w-2/4 mx-auto py-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="opacity-80 pt-1 pb-5">
          Sign up and take control—organize, prioritize, and achieve!
        </p>

        <button className="border flex w-max rounded-full px-4 opacity-90 cursor-pointer items-center gap-1.5 py-1 text-sm md:text-base font-semibold border-gray-500/50">
          <img src={googlrPng} alt="" className="w-3 h-3 md:h-5 md:w-5" />{" "}
          Continue with Google
        </button>

        <div className="text-xs md:text-sm opacity-50 pt-3">
          ------------- or -------------
        </div>

        <form onSubmit={handleSignUp}>
          <div className="flex flex-col my-3">
            <label htmlFor="name">Name</label>
            <input
              required
              name="name"
              placeholder="Enter your name"
              type="text"
              className="border border-gray-500/50 px-3 focus:outline-none py-1 rounded-md "
            />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="email">Email</label>
            <input
              required
              name="email"
              placeholder="Enter your email"
              type="email"
              className="border border-gray-500/50 px-3 focus:outline-none py-1 rounded-md "
            />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              placeholder="Password"
              type="password"
              className="border border-gray-500/50 px-3 focus:outline-none py-1 rounded-md "
            />
          </div>

          <Button>Sign Up</Button>
        </form>
        <p className="text-xs md:text-sm pt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
