const express = require("express");
const router = express.Router();
const { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry } = require("../controllers/enquiry.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/", submitEnquiry);
router.get("/", protect, authorize("admin"), getEnquiries);
router.put("/:id", protect, authorize("admin"), updateEnquiry);
router.delete("/:id", protect, authorize("admin"), deleteEnquiry);

module.exports = router;
