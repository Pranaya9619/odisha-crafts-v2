import React from "react";

const ReviewSection = ({ reviews }) => {
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="border-t pt-12">
      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews ({reviews.length})
      </h2>

      <p className="text-lg font-semibold mb-8">
        ⭐ {averageRating} / 5
      </p>

      {reviews.length === 0 ? (
        <p className="text-stone-500">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50 p-6 rounded-xl border"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">{review.name}</h4>
                <span className="text-sm text-stone-400">
                  {review.date}
                </span>
              </div>

              <div className="mb-2">
                {"⭐".repeat(review.rating)}
              </div>

              <p className="text-stone-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;