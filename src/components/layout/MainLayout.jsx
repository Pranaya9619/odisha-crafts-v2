import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="font-sans text-stone-800 bg-stone-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;