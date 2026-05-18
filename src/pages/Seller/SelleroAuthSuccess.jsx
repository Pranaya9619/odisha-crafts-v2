import { useEffect } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const SellerOAuthSuccess = () => {

  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  useEffect(() => {

    const token =
      searchParams.get("token");

    if (!token) {

      navigate("/seller/login");

      return;

    }

    localStorage.setItem(
      "sellerToken",
      token
    );

    navigate("/seller");

  }, []);

  return (

    <div className="min-h-screen flex items-center justify-center">

      Logging you in...

    </div>

  );

};

export default SellerOAuthSuccess;