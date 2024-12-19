const mongoose = require('mongoose')
const User = require("./userModel");

const productModel = new mongoose.Schema ({
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  createAt : {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Real Estate",
      "Vehicles",
      "Electronics",
      "Furniture",
      "Jobs",
      "Clothing",
      "Services",
      "Others",
    ],
  }
});

const Product = mongoose.model("products", productModel);
module.exports = Product;