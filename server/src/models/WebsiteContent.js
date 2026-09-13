const mongoose = require("mongoose");

const websiteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: [
        "HERO", "TRUST_BAR", "ABOUT", "METHODOLOGY", "COURSES_INTRO",
        "TEST_SERIES_PROMO", "RESULTS_SHOWCASE", "TESTIMONIALS",
        "ACHIEVEMENTS", "CTA", "CONTACT", "ANNOUNCEMENT_BAR",
      ],
      required: true,
      unique: true,
    },
    slides: [
      {
        title: String,
        subtitle: String,
        description: String,
        ctaText: String,
        ctaLink: String,
        secondaryCtaText: String,
        secondaryCtaLink: String,
        imageUrl: String,
        imagePublicId: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],
    blocks: [
      {
        heading: String,
        subheading: String,
        body: String,
        imageUrl: String,
        icon: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],
    stats: [{ label: String, value: String, icon: String }],
    announcementBar: {
      text: String,
      link: String,
      isActive: { type: Boolean, default: false },
      bgColor: { type: String, default: "#A8C900" },
      textColor: { type: String, default: "#0B0F0D" },
    },
    isVisible: { type: Boolean, default: true },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteContent", websiteContentSchema);
