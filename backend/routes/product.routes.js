const express = require("express");
const {
  getProducts,
  setProducts,
  deleteProduct,
  editProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/get", getProducts);
router.post("/add", setProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
