const express = require("express");
const router = express.Router();
const { getMaterials, createMaterial, deleteMaterial } = require("../controllers/material.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getMaterials);
router.post("/", protect, authorize("admin", "teacher"), createMaterial);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteMaterial);

module.exports = router;
