import { motion } from "framer-motion";

import {
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

// const handleLogout = () => {

//   localStorage.removeItem(
//     "sellerToken"
//   );

//   navigate("/seller/login");

// };

const steps = [
  {
    id: 1,
    label: "GST",
  },

  {
    id: 2,
    label: "PAN",
  },

  {
    id: 3,
    label: "Store",
  },

  {
    id: 4,
    label: "Shipping",
  },

  {
    id: 5,
    label: "Bank",
  },

  {
    id: 6,
    label: "Consent",
  },
];

const SellerOnboardingLayout = ({
  title,
  subtitle,
  step,
  children,
}) => {

  const progress =
    (step / 6) * 100;

  const navigate =
    useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "sellerToken"
    );

    navigate("/seller/login");

  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
      >

        {/* =================================================
           HEADER
        ================================================= */}

        <div className="border-b border-stone-200 px-8 py-8 bg-gradient-to-r from-orange-50 to-red-50">

          {/* TOP */}

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">

            <div>

              <p className="text-sm uppercase tracking-wider text-orange-500 font-semibold">
                Seller Registration
              </p>

              <h1 className="text-4xl font-bold text-stone-900 mt-2">
                {title}
              </h1>

              {subtitle && (
                <p className="text-stone-500 mt-3 max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}

            </div>

            {/* STEP */}

            <div className="bg-white border border-stone-200 rounded-2xl px-5 py-4 shadow-sm">

              <p className="text-sm text-stone-500">
                Current Step
              </p>

              <p className="text-2xl font-bold text-stone-900 mt-1">
                {step}/6
              </p>

            </div>

            <div className="flex justify-end">

              <button
                onClick={handleLogout}
                className="mt-4 lg:mt-3 flex items-center gap-2 bg-white border border-stone-200 hover:border-red-300 hover:bg-red-50 text-stone-700 hover:text-red-600 px-5 py-2.5 rounded-xl shadow-sm transition font-medium"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          </div>

          {/* =================================================
             PROGRESS BAR
          ================================================= */}

          <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden mb-8">

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            />

          </div>

          {/* =================================================
             STEP TRACKER
          ================================================= */}

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

            {steps.map((s) => {

              const completed =
                step > s.id;

              const active =
                step === s.id;

              const locked =
                step < s.id;

              return (
                <div
                  key={s.id}
                  className={`rounded-2xl border p-4 transition ${active
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg"
                    : completed
                      ? "bg-green-50 border-green-200"
                      : "bg-stone-50 border-stone-200"
                    }`}
                >

                  <div className="flex items-center justify-between mb-3">

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${active
                        ? "bg-white text-orange-500"
                        : completed
                          ? "bg-green-500 text-white"
                          : "bg-stone-200 text-stone-500"
                        }`}
                    >

                      {completed ? (
                        <CheckCircle2
                          size={18}
                        />
                      ) : locked ? (
                        <Lock
                          size={16}
                        />
                      ) : (
                        <Circle
                          size={16}
                        />
                      )}

                    </div>

                    <span className="text-xs font-medium opacity-80">
                      0{s.id}
                    </span>

                  </div>

                  <p
                    className={`text-sm font-medium ${active
                      ? "text-white"
                      : "text-stone-700"
                      }`}
                  >
                    {s.label}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        {/* =================================================
           CONTENT
        ================================================= */}

        <div className="p-8 lg:p-10">

          {children}

        </div>

      </motion.div>

    </div>
  );
};

export default SellerOnboardingLayout;