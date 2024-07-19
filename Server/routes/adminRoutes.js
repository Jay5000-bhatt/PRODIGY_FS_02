const express = require("express");
const {
  registerAdmin,
  authAdmin,
  verifyAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/verify", verifyAdmin);
router.post("/login", authAdmin);

module.exports = router;
