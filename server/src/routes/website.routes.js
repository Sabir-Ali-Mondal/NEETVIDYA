const express = require("express");
const router = express.Router();
const { getHomepage, getSection, updateSection } = require("../controllers/website.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/home", getHomepage);
router.get("/section/:section", getSection);
router.put("/section/:section", protect, authorize("admin"), updateSection);

module.exports = router;
