const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },

      quantity: {
        type: Number,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["razorpay", "cod", "coupon"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
    default: "placed",
  },

  razorpayOrderId: String,
  razorpayPaymentId: String,

  estimatedDelivery: Date,
},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);