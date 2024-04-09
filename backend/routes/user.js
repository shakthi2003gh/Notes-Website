const express = require("express");
const controller = require("../controllers/user");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/auth", auth, controller.auth);
router.get("/settings/sync", auth, controller.checkSettingsSync);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/register/resend-otp", controller.resendOTP);
router.post("/verify", controller.verify);
router.post("/settings/sync", auth, controller.syncSettings);
router.delete("/", auth, controller.delete);

exports.user = router;
