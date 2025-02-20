import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


const RootPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="w-11/12 mx-auto">
            <Outlet></Outlet>
            </div>
        </>
    );
};

export default RootPage;