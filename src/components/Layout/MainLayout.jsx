import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="w-full h-screen flex flex-col bg-black items-center justify-center  text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
