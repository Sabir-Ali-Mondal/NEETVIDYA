const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } });
const {
  getMaterials,
  getMyBatchMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialTree,
} = require("../controllers/material.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/my", protect, authorize("student"), getMyBatchMaterials);
router.get("/tree", protect, getMaterialTree);
router.get("/", protect, getMaterials);
router.post("/", protect, authorize("admin", "teacher"), upload.single("file"), createMaterial);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteMaterial);

module.exports = router;
