import React from "react";

const Earnings = () => {
  const totalRevenue = 32400;
  const commission = totalRevenue * 0.15;
  const net = totalRevenue * 0.85;

  return (
    <div className="bg-white p-6 rounded shadow space-y-3">
      <p>Total Revenue: ₹{totalRevenue}</p>
      <p>Commission (15%): ₹{commission}</p>
      <p className="font-bold">Net Earnings (85%): ₹{net}</p>

      <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded">
        Withdraw (Demo)
      </button>
    </div>
  );
};

export default Earnings;