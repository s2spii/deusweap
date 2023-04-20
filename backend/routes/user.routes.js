const express = require("express");
const {
  getUsers,
  setUsers,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/get", getUsers);
router.post("/set", setUsers);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
