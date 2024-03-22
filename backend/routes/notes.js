const express = require("express");
const controller = require("../controllers/notes");
const { auth } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", auth, controller.get);
router.get("/:id", validateObjectId, auth, controller.getNote);
router.post("/", auth, controller.create);
router.patch("/:id", validateObjectId, auth, controller.update);
router.delete("/:id", validateObjectId, auth, controller.delete);

exports.notes = router;
