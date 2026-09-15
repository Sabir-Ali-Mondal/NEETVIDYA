const express = require("express");
const router = express.Router();
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievement.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getAchievements);
router.post("/", protect, authorize("admin"), createAchievement);
router.put("/:id", protect, authorize("admin"), updateAchievement);
router.delete("/:id", protect, authorize("admin"), deleteAchievement);

module.exports = router;
