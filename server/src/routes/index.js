const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/students", require("./student.routes"));
router.use("/teachers", require("./teacher.routes"));
router.use("/batches", require("./batch.routes"));
router.use("/enrollments", require("./enrollment.routes"));
router.use("/courses", require("./course.routes"));
router.use("/academics", require("./academic.routes"));
router.use("/materials", require("./material.routes"));
// Video lectures are now published as materials (type: VIDEO) — the separate lecture
// system has been retired. The /resources route below is unrelated (course resources).
router.use("/resources", require("./resource.routes"));
router.use("/questions", require("./question.routes"));
router.use("/test-series", require("./testSeries.routes"));
router.use("/exams", require("./exam.routes"));
router.use("/attempts", require("./attempt.routes"));
router.use("/results", require("./result.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/achievements", require("./achievement.routes"));
router.use("/testimonials", require("./testimonial.routes"));
router.use("/enquiries", require("./enquiry.routes"));
router.use("/website", require("./website.routes"));
router.use("/upload", require("./upload.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/contact-settings", require("./contactSettings.routes"));

module.exports = router;
