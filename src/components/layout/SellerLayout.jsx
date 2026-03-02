import { Outlet } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";
import SellerFooter from "./SellerFooter";

const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <SellerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <SellerFooter />
    </div>
  );
};

export default SellerLayout;