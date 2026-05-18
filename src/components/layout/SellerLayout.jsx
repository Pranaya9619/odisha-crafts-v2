import SellerNavbar from "../seller/SellerNavbar";
import SellerFooter from "../seller/SellerFooter";

import {
  Outlet,
  useLocation,
} from "react-router-dom";

const SellerLayout = () => {

  const location = useLocation();

  const isOnboarding =
    location.pathname.includes("/seller/onboarding");

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">

      {/* 🔥 Hide navbar during onboarding */}

      {!isOnboarding && <SellerNavbar />}

      {/* ================= MAIN ================= */}

      <main className="flex-1">

        {/* 🚀 ONBOARDING LAYOUT */}

        {isOnboarding ? (

          <div className="min-h-screen flex items-center justify-center p-6">

            <div className="w-full max-w-3xl">

              <Outlet />

            </div>

          </div>

        ) : (

          <Outlet />

        )}

      </main>

      {/* 🔥 Hide footer during onboarding */}

      {!isOnboarding && <SellerFooter />}

    </div>
  );
};

export default SellerLayout;