const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/contactSettings.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getSettings);
router.put("/", protect, authorize("admin"), updateSettings);

module.exports = router;
