import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const email = searchParams.get("email");

  const success = status === "success";

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          {success ? (
            <CheckCircle className="w-20 h-20 text-green-400" />
          ) : (
            <XCircle className="w-20 h-20 text-red-400" />
          )}
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          {success
            ? "Unsubscribed Successfully"
            : "Something Went Wrong"}
        </h1>

        <p className="text-stone-300 leading-8 mb-8">
          {success
            ? `The email ${
                email || ""
              } has been removed from the OdishaCrafts newsletter.`
            : "We couldn’t process your unsubscribe request."}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 transition text-white font-medium"
        >
          Return to OdishaCrafts
        </Link>
      </motion.div>
    </div>
  );
};

export default Unsubscribe;