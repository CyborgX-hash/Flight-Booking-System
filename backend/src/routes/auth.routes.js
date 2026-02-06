const express = require("express");
const router = express.Router();
const { signup, login, getProfile, updateProfile } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, upload.single("profilePhoto"), updateProfile);

module.exports = router;
