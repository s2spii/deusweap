const express = require("express");
const {
  getCategories,
  setCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/get", getCategories);
router.post("/add", setCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
