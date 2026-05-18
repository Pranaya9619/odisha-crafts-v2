import {
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../../services/adminApi";

import {
  ShieldCheck,
  Store,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  BadgeCheck,
  Archive,
  XCircle,
} from "lucide-react";


/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {

  const styles = {

    onboarding:
      "bg-yellow-100 text-yellow-700",

    approval_pending:
      "bg-blue-100 text-blue-700",

    approved:
      "bg-green-100 text-green-700",

    rejected:
      "bg-red-100 text-red-700",

    archived:
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status] ||
        "bg-gray-100"
        }`}
    >
      {status}
    </span>
  );

};


/* =========================================================
   PAGE
========================================================= */

const VendorApprovals =
  () => {

    const [
      vendors,
      setVendors,
    ] = useState([]);

    const [
      filter,
      setFilter,
    ] = useState("all");

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      actionLoading,
      setActionLoading,
    ] = useState(null);

    /* =====================================================
       FETCH
    ===================================================== */

    const fetchVendors =
      async () => {

        try {

          const res =
            await API.get(
              "/vendors"
            );

          setVendors(
            res.data
          );

        } catch (err) {

          console.error(
            "Vendor fetch error:",
            err
          );

        } finally {

          setLoading(
            false
          );

        }
      };

    useEffect(() => {

      fetchVendors();

    }, []);

    /* =====================================================
       ACTIONS
    ===================================================== */

    const handleAction =
      async (
        id,
        action
      ) => {

        try {

          setActionLoading(
            id
          );

          await API.put(
            `/vendors/${id}/${action}`
          );

          setVendors(
            (prev) =>
              prev.map(
                (v) =>
                  v._id === id
                    ? {
                      ...v,

                      status:
                        action ===
                          "approve"
                          ? "approved"
                          : action ===
                            "reject"
                            ? "rejected"
                            : action ===
                              "restore"
                              ? "approved"
                              : "archived",

                      // ✅ KEEP IN SYNC
                      isArchived:
                        action ===
                        "archive",
                    }
                    : v
              )
          );

        } catch (err) {

          console.error(
            "Action error:",
            err
          );

        } finally {

          setActionLoading(
            null
          );

        }
      };

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredVendors =
      useMemo(() => {

        if (
          filter === "all"
        ) {
          return vendors;
        }

        return vendors.filter(
          (v) =>
            v.status ===
            filter
        );

      }, [
        vendors,
        filter,
      ]);

    /* =====================================================
       UI
    ===================================================== */

    return (
      <div className="min-h-screen bg-stone-100 p-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-stone-900">

              Vendor Verification

            </h1>

            <p className="text-stone-500 mt-2">

              Review onboarding details,
              documents and marketplace
              eligibility.

            </p>

          </div>

          {/* FILTER */}

          <select
            className="px-4 py-3 rounded-xl border border-stone-300 bg-white"
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Vendors
            </option>

            <option value="approval_pending">
              Approval Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>

            <option value="archived">
              Archived
            </option>

          </select>

        </div>

        {/* CONTENT */}

        {loading ? (

          <div className="bg-white rounded-3xl p-10 text-center text-stone-500 shadow">

            Loading vendors...

          </div>

        ) : filteredVendors.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center text-stone-500 shadow">

            No vendors found.

          </div>

        ) : (

          <div className="grid gap-6">

            {filteredVendors.map(
              (v) => (

                <div
                  key={v._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  {/* TOP BAR */}

                  <div className="border-b border-stone-200 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-2xl font-bold text-stone-900">

                          {v.storeName ||
                            "Untitled Store"}

                        </h2>

                        <StatusBadge
                          status={
                            v.status
                          }
                        />

                      </div>

                      <p className="text-stone-500 mt-2">

                        {v.name} •{" "}
                        {v.email}

                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-3">

                      {v.status !==
                        "approved" &&
                        v.status !==
                        "archived" && (

                          <button
                            disabled={
                              actionLoading ===
                              v._id
                            }
                            onClick={() =>
                              handleAction(
                                v._id,
                                "approve"
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                          >

                            <ShieldCheck
                              size={18}
                            />

                            Approve

                          </button>
                        )}

                      {v.status !==
                        "rejected" &&
                        v.status !==
                        "archived" && (

                          <button
                            disabled={
                              actionLoading ===
                              v._id
                            }
                            onClick={() =>
                              handleAction(
                                v._id,
                                "reject"
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                          >

                            <XCircle
                              size={18}
                            />

                            Reject

                          </button>
                        )}

                      {v.status !==
                        "archived" ? (

                        <button
                          disabled={
                            actionLoading ===
                            v._id
                          }
                          onClick={() =>
                            handleAction(
                              v._id,
                              "archive"
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-black text-white flex items-center gap-2"
                        >

                          <Archive
                            size={18}
                          />

                          Archive

                        </button>

                      ) : (

                        <button
                          disabled={
                            actionLoading ===
                            v._id
                          }
                          onClick={() =>
                            handleAction(
                              v._id,
                              "restore"
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >

                          <ShieldCheck
                            size={18}
                          />

                          Restore

                        </button>

                      )}

                    </div>

                  </div>

                  {/* DETAILS GRID */}
                  {/* KEEPING YOUR EXISTING DETAILS UI EXACTLY SAME */}

                  <div className="grid lg:grid-cols-2 gap-6 p-6">

                    {/* DETAILS GRID */}

                    <div className="grid lg:grid-cols-2 gap-6 p-6">

                      {/* ================= STORE DETAILS ================= */}

                      <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">

                        <div className="flex items-center gap-2 mb-5">

                          <Store className="text-orange-500" size={20} />

                          <h3 className="text-lg font-semibold text-stone-900">
                            Store Details
                          </h3>

                        </div>

                        <div className="space-y-4 text-sm">

                          <div>
                            <p className="text-stone-500">
                              Store Name
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.storeName || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Owner Name
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.name || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Email
                            </p>

                            <p className="font-medium text-stone-900 break-all">
                              {v.email || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Phone
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.phone || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Address
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.address || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Craft Category
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.craftCategory || "N/A"}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* ================= BUSINESS DETAILS ================= */}

                      <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">

                        <div className="flex items-center gap-2 mb-5">

                          <BadgeCheck
                            className="text-green-500"
                            size={20}
                          />

                          <h3 className="text-lg font-semibold text-stone-900">
                            Verification Details
                          </h3>

                        </div>

                        <div className="space-y-4 text-sm">

                          <div>
                            <p className="text-stone-500">
                              GST Number
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.gstNumber || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Bank Account Holder
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.bankAccountName || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Account Number
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.bankAccountNumber || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              IFSC Code
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.ifscCode || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-stone-500">
                              Pickup Available
                            </p>

                            <p className="font-medium text-stone-900">
                              {v.pickupAvailable
                                ? "Yes"
                                : "No"}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* ================= DOCUMENTS ================= */}

                      <div className="lg:col-span-2 bg-stone-50 rounded-2xl p-5 border border-stone-200">

                        <div className="flex items-center gap-2 mb-5">

                          <FileText
                            className="text-blue-500"
                            size={20}
                          />

                          <h3 className="text-lg font-semibold text-stone-900">
                            Uploaded Documents
                          </h3>

                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                          {/* GST FILE */}

                          {v.gstFile && (
                            <a
                              href={`http://localhost:5000/${v.gstFile}`}
                              target="_blank"
                              rel="noreferrer"
                              className="border border-stone-200 rounded-2xl bg-white p-4 hover:border-orange-400 transition"
                            >

                              <p className="font-semibold text-stone-900">
                                GST Document
                              </p>

                              <p className="text-sm text-stone-500 mt-1">
                                Click to view
                              </p>

                            </a>
                          )}

                          {/* AADHAR FILE */}

                          {v.aadharFile && (
                            <a
                              href={`http://localhost:5000/${v.aadharFile}`}
                              target="_blank"
                              rel="noreferrer"
                              className="border border-stone-200 rounded-2xl bg-white p-4 hover:border-orange-400 transition"
                            >

                              <p className="font-semibold text-stone-900">
                                Aadhaar Document
                              </p>

                              <p className="text-sm text-stone-500 mt-1">
                                Click to view
                              </p>

                            </a>
                          )}

                          {/* PAN FILE */}

                          {v.panFile && (
                            <a
                              href={`http://localhost:5000/${v.panFile}`}
                              target="_blank"
                              rel="noreferrer"
                              className="border border-stone-200 rounded-2xl bg-white p-4 hover:border-orange-400 transition"
                            >

                              <p className="font-semibold text-stone-900">
                                PAN Document
                              </p>

                              <p className="text-sm text-stone-500 mt-1">
                                Click to view
                              </p>

                            </a>
                          )}

                        </div>

                        {!v.gstFile &&
                          !v.aadharFile &&
                          !v.panFile && (

                            <p className="text-stone-500 text-sm">
                              No documents uploaded.
                            </p>

                          )}

                      </div>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>
    );
  };

export default VendorApprovals;