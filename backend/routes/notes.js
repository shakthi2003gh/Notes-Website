const express = require("express");
const controller = require("../controllers/notes");
const { auth } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validateObjectId");

const router = express.Router();

router.use(auth);

router.get("/", controller.get);
router.get("/sync", controller.checkSync);
router.get("/:id", validateObjectId, controller.getNote);
router.get("/:id/sync", controller.checkSync);
router.post("/", controller.create);
router.patch("/:id", validateObjectId, controller.update);
router.delete("/:id", validateObjectId, controller.delete);

exports.notes = router;
