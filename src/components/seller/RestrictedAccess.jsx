import {
  useMemo,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ShieldAlert,
  Clock3,
  XCircle,
  Archive,
  Lock,
  CheckCircle2,
  User,
  Settings,
} from "lucide-react";

const RestrictedAccess = ({
  seller,
}) => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* =====================================================
     STATUS CONTENT
  ===================================================== */

  const content =
    useMemo(() => {

      switch (
        seller?.status
      ) {

        case "approval_pending":

          return {
            icon: Clock3,

            iconBg:
              "bg-yellow-100",

            iconColor:
              "text-yellow-600",

            title:
              "Approval Pending",

            description:
              "Your seller account is currently under admin review. While verification is in progress, only your profile and settings sections remain editable.",

            badge:
              "Under Review",
          };

        case "rejected":

          return {
            icon: XCircle,

            iconBg:
              "bg-red-100",

            iconColor:
              "text-red-600",

            title:
              "Application Rejected",

            description:
              "Your seller verification request was rejected during moderation review. Please contact support or update your details.",

            badge:
              "Rejected",
          };

        case "archived":

          return {
            icon: Archive,

            iconBg:
              "bg-stone-200",

            iconColor:
              "text-stone-700",

            title:
              "Account Archived",

            description:
              "This seller account has been archived and marketplace access has been disabled by admin moderation.",

            badge:
              "Archived",
          };

        default:

          return {
            icon:
              ShieldAlert,

            iconBg:
              "bg-orange-100",

            iconColor:
              "text-orange-600",

            title:
              "Restricted Access",

            description:
              "This section is currently unavailable.",

            badge:
              "Restricted",
          };
      }

    }, [seller]);

  const Icon =
    content.icon;

  /* =====================================================
     ALLOWED ROUTES
  ===================================================== */

  const allowedRoutes =
    [
      "/seller/profile",
      "/seller/settings",
    ];

  const isAllowed =
    allowedRoutes.some(
      (route) =>
        location.pathname.startsWith(
          route
        )
    );

  /* =====================================================
     ALLOW PROFILE + SETTINGS
  ===================================================== */

  if (isAllowed) {
    return null;
  }

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden">

      {/* =================================================
         BLURRED BACKGROUND
      ================================================= */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20" />

      </div>

      {/* =================================================
         LOCKED DASHBOARD MOCK
      ================================================= */}

      <div className="absolute inset-0 p-8 blur-sm opacity-40 pointer-events-none">

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          {[1, 2, 3].map(
            (item) => (

              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg p-6 h-36"
              >

                <div className="w-20 h-4 bg-stone-200 rounded mb-6" />

                <div className="w-28 h-8 bg-stone-300 rounded" />

              </div>

            )
          )}

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {[1, 2, 3, 4].map(
            (item) => (

              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg p-8 h-48"
              >

                <div className="w-32 h-5 bg-stone-300 rounded mb-6" />

                <div className="space-y-3">

                  <div className="w-full h-3 bg-stone-200 rounded" />

                  <div className="w-4/5 h-3 bg-stone-200 rounded" />

                  <div className="w-3/5 h-3 bg-stone-200 rounded" />

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* =================================================
         OVERLAY
      ================================================= */}

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">

        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl p-10">

          {/* =============================================
             ICON
          ============================================= */}

          <div className="flex justify-center mb-8">

            <div className={`w-24 h-24 rounded-[28px] flex items-center justify-center ${content.iconBg}`}>

              <Icon
                size={42}
                className={content.iconColor}
              />

            </div>

          </div>

          {/* =============================================
             TEXT
          ============================================= */}

          <div className="text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-700 text-sm font-medium mb-5">

              <Lock size={15} />

              {content.badge}

            </div>

            <h1 className="text-4xl font-bold text-stone-900 mb-5">

              {content.title}

            </h1>

            <p className="text-stone-600 leading-relaxed text-lg max-w-xl mx-auto">

              {content.description}

            </p>

          </div>

          {/* =============================================
             ALLOWED FEATURES
          ============================================= */}

          <div className="mt-10 grid md:grid-cols-2 gap-5">

            {/* PROFILE */}

            <button
              onClick={() =>
                navigate(
                  "/seller/profile"
                )
              }
              className="group bg-stone-50 hover:bg-orange-50 border border-stone-200 hover:border-orange-300 transition rounded-3xl p-6 text-left"
            >

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">

                <User
                  size={24}
                  className="text-orange-600"
                />

              </div>

              <h3 className="text-xl font-semibold text-stone-900 mb-2">

                Profile Access

              </h3>

              <p className="text-sm text-stone-600 leading-relaxed">

                Update personal information including name, email, phone and business address.

              </p>

            </button>

            {/* SETTINGS */}

            <button
              onClick={() =>
                navigate(
                  "/seller/settings"
                )
              }
              className="group bg-stone-50 hover:bg-orange-50 border border-stone-200 hover:border-orange-300 transition rounded-3xl p-6 text-left"
            >

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">

                <Settings
                  size={24}
                  className="text-orange-600"
                />

              </div>

              <h3 className="text-xl font-semibold text-stone-900 mb-2">

                Settings

              </h3>

              <p className="text-sm text-stone-600 leading-relaxed">

                Manage password security and account preferences while verification is reviewed.

              </p>

            </button>

          </div>

          {/* =============================================
             REVIEW INFO
          ============================================= */}

          {seller?.status ===
            "approval_pending" && (

            <div className="mt-10 bg-green-50 border border-green-200 rounded-3xl p-6">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">

                  <CheckCircle2
                    size={24}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-green-900 text-lg">

                    Verification Submitted Successfully

                  </h3>

                  <p className="text-green-800 text-sm mt-2 leading-relaxed">

                    Your onboarding details, compliance documents and payout information have been securely submitted for moderation review.

                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default RestrictedAccess;