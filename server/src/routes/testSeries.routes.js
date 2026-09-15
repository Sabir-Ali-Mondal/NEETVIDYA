const express = require("express");
const router = express.Router();
const { getTestSeries, createTestSeries, updateTestSeries } = require("../controllers/testSeries.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getTestSeries);
router.post("/", protect, authorize("admin", "teacher"), createTestSeries);
router.put("/:id", protect, authorize("admin"), updateTestSeries);

module.exports = router;
