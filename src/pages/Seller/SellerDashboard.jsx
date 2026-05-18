import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  User,
  Users,
  Package,
  ShoppingBag,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Lock,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/sellerApi";


const SellerDashboard =
  () => {

    const location =
      useLocation();

    const [
      seller,
      setSeller,
    ] = useState(null);

    useEffect(() => {

      const fetchSeller =
        async () => {

          try {

            const res =
              await API.get(
                "/seller/me"
              );

            setSeller(
              res.data
            );

          } catch (err) {

            console.error(
              err
            );

          }
        };

      fetchSeller();

    }, []);

    const isApproved =
      seller?.status ===
      "approved";

    const menu = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon:
          LayoutDashboard,
        path:
          "/seller/dashboard",
        locked:
          !isApproved,
      },

      {
        id: "profile",
        label: "Profile",
        icon: User,
        path:
          "/seller/profile",
        locked: false,
      },

      {
        id: "artisans",
        label: "Artisans",
        icon: Users,
        path:
          "/seller/artisans",
        locked:
          !isApproved,
      },

      {
        id: "products",
        label: "Products",
        icon: Package,
        path:
          "/seller/products",
        locked:
          !isApproved,
      },

      {
        id: "orders",
        label: "Orders",
        icon:
          ShoppingBag,
        path:
          "/seller/orders",
        locked:
          !isApproved,
      },

      {
        id: "reviews",
        label: "Reviews",
        icon: Star,
        path:
          "/seller/reviews",
        locked:
          !isApproved,
      },

      {
        id: "analytics",
        label:
          "Analytics",
        icon:
          BarChart3,
        path:
          "/seller/analytics",
        locked:
          !isApproved,
      },

      {
        id: "settings",
        label:
          "Settings",
        icon: Settings,
        path:
          "/seller/settings",
        locked: false,
      },
    ];

    /* ================= LOGOUT ================= */

    const handleLogout =
      () => {

        localStorage.removeItem(
          "sellerToken"
        );

        window.location.href =
          "/seller/login";

      };

    /* ================= DEFAULT REDIRECT ================= */

    if (
      location.pathname ===
      "/seller"
    ) {

      return (
        <Navigate
          to="/seller/dashboard"
          replace
        />
      );

    }

    return (
      <div className="flex min-h-[calc(100vh-120px)]">

        {/* SIDEBAR */}

        <aside className="w-64 bg-stone-900 text-white p-6 flex flex-col">

          <h2 className="text-xl font-semibold mb-8 tracking-wide">

            Seller Panel

          </h2>

          {/* APPROVAL BADGE */}

          {!isApproved && (

            <div className="mb-6 bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-3 rounded-lg text-sm">

              Approval Pending

            </div>

          )}

          {/* MENU */}

          <nav className="flex flex-col gap-2 flex-1">

            {menu.map(
              (item) => {

                const Icon =
                  item.icon;

                // ✅ LOCKED ITEMS
                if (
                  item.locked
                ) {

                  return (
                    <div
                      key={
                        item.id
                      }
                      className="flex items-center justify-between px-3 py-2 rounded opacity-70 cursor-not-allowed text-stone-400 bg-stone-800/40"
                    >

                      <div className="flex items-center gap-3">

                        <Icon
                          size={
                            18
                          }
                        />

                        {
                          item.label
                        }

                      </div>

                      <Lock
                        size={
                          14
                        }
                      />

                    </div>
                  );

                }

                // ✅ NORMAL ITEMS

                return (
                  <NavLink
                    key={
                      item.id
                    }
                    to={
                      item.path
                    }
                    className={({
                      isActive,
                    }) =>
                      `flex items-center gap-3 px-3 py-2 rounded transition ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-stone-800 text-stone-300"
                      }`
                    }
                  >

                    <Icon
                      size={18}
                    />

                    {
                      item.label
                    }

                  </NavLink>
                );

              }
            )}

          </nav>

          {/* LOGOUT */}

          <button
            onClick={
              handleLogout
            }
            className="flex items-center gap-3 mt-6 px-3 py-2 rounded hover:bg-red-600 bg-red-500"
          >

            <LogOut
              size={18}
            />

            Logout

          </button>

        </aside>

        {/* CONTENT */}

        <main className="flex-1 p-8 bg-stone-100 relative">

          {/* BLUR OVERLAY */}

          {!isApproved &&
            !location.pathname.includes(
              "/profile"
            ) &&
            !location.pathname.includes(
              "/settings"
            ) && (

              <div className="absolute inset-0 backdrop-blur-md bg-white/70 z-50 flex items-center justify-center">

                <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md">

                  <h2 className="text-2xl font-bold mb-3">

                    Your Seller Account Is Under Review

                  </h2>

                  <p className="text-gray-600">

                    Your onboarding details are under review by the admin.
                    You can continue editing your profile and settings while our team verifies your onboarding details.

                  </p>

                </div>

              </div>
            )}

          <Outlet />

        </main>

      </div>
    );

  };

export default
  SellerDashboard;