const express = require("express");
const router = express.Router();
const authMiddleware = require("./Middleware/authMiddleware");
const { registerUser, login } = require("./controllers/userControllers");

const {   
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("./controllers/productControllers");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/product", authMiddleware, createProduct);
router.get("/products", authMiddleware, getProducts);
router.put("/products/:productId", authMiddleware, updateProduct);
router.delete("/product/:productId", authMiddleware, deleteProduct);

module.exports = router;