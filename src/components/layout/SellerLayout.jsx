import SellerNavbar from "../seller/SellerNavbar";
import SellerFooter from "../seller/SellerFooter";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <SellerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <SellerFooter />

    </div>
  );
};

export default SellerLayout;