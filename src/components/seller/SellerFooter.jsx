const SellerFooter = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 py-4">
      <p className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} OdishaCrafts Seller Panel
      </p>
    </footer>
  );
};

export default SellerFooter;