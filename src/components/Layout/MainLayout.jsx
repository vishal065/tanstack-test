import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="w-full h-screen bg-black text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
