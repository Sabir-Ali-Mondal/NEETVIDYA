const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
