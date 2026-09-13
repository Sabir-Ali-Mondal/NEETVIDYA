const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    course: { type: String },
    message: { type: String, required: true },
    source: { type: String, enum: ["WEBSITE", "TELEGRAM", "WHATSAPP"], default: "WEBSITE" },
    status: { type: String, enum: ["PENDING", "CONTACTED", "RESOLVED"], default: "PENDING" },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
