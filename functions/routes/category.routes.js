const express = require("express");
const {
  getCategories,
  setCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/get", getCategories);
router.post("/add", setCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
