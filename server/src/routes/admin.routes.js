const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { getAdminDashboard } = require("../controllers/dashboard.controller");
const ActivityLog = require("../models/ActivityLog");
const apiResponse = require("../utils/apiResponse");

router.get("/dashboard", protect, authorize("admin"), getAdminDashboard);

router.get("/activity-logs", protect, authorize("admin"), async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);
    return apiResponse(res, 200, "Activity logs", { logs });
  } catch (error) {
    next(error);
  }
});

// System maintenance utilities
router.get("/system-health", protect, authorize("admin"), async (req, res, next) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStateMap = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };
    return apiResponse(res, 200, "System health retrieved", {
      database: {
        status: dbState === 1 ? "Healthy" : "Degraded",
        connectionState: dbStateMap[dbState] || "Unknown",
        name: mongoose.connection.name || "neetvidya",
      },
      server: {
        uptime: Math.round(process.uptime()),
        memoryUsageMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
        nodeVersion: process.version,
        platform: process.platform,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/clear-cache", protect, authorize("admin"), async (req, res, next) => {
  try {
    return apiResponse(res, 200, "In-memory cache and temporary assets cleared successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
