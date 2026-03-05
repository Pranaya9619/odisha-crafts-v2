import React, { useEffect, useState } from "react";
import API from "../../services/sellerApi";

const SellerReviews = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);



  /* ================= LOAD REVIEWS ================= */

  const fetchReviews = async () => {

    try {

      const res = await API.get("/products/my");

      const products = res.data;

      const allReviews = [];

      products.forEach((product) => {

        product.reviews?.forEach((review) => {

          allReviews.push({
            productName: product.name,
            rating: review.rating,
            comment: review.comment,
            user: review.name,
            date: review.createdAt,
            id: review._id,
          });

        });

      });

      setReviews(allReviews);
      setLoading(false);

    } catch (err) {

      console.error("Reviews fetch error:", err);
      setLoading(false);

    }

  };



  useEffect(() => {
    fetchReviews();
  }, []);



  if (loading) {
    return (
      <div className="p-8 text-gray-600">
        Loading reviews...
      </div>
    );
  }



  return (

    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Customer Reviews
      </h1>


      {reviews.length === 0 ? (

        <div className="bg-white p-6 rounded shadow text-gray-500">
          No reviews yet.
        </div>

      ) : (

        <div className="space-y-4">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="bg-white p-5 rounded-lg shadow"
            >

              <div className="flex justify-between items-center mb-2">

                <strong>
                  {review.productName}
                </strong>

                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>

              </div>

              <p className="text-gray-700 mb-2">
                {review.comment}
              </p>

              <div className="text-sm text-gray-500">
                {review.user} •{" "}
                {new Date(review.date).toLocaleDateString()}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default SellerReviews;