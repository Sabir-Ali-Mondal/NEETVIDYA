const express = require("express");
const router = express.Router();
const { getResources, createResource, deleteResource } = require("../controllers/resource.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getResources);
router.get("/public", getResources);
router.post("/", protect, authorize("admin", "teacher"), createResource);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteResource);

module.exports = router;
