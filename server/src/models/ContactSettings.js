const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    instituteEmail: { type: String, default: "neetvidya720@gmail.com" },
    institutePhone: { type: String, default: "+91 74396 85658 / +91 83910 21878" },
    address: { type: String, default: "Karimpur Main Road, Karimpur, Nadia" },
    city: { type: String, default: "Karimpur" },
    state: { type: String, default: "Nadia" },
    telegramChannelLink: { type: String, default: "https://t.me/neetvidya720official" },
    whatsappGroupLink: { type: String, default: "" },
    whatsappNumber: { type: String, default: "917439685658" },
    whatsappDefaultMessage: { type: String, default: "Hello NEETVIDYA! I am interested in admission." },
    facebookLink: { type: String, default: "" },
    instagramLink: { type: String, default: "" },
    youtubeLink: { type: String, default: "" },
    officeHours: { type: String, default: "Mon - Sat: 9:00 AM - 6:00 PM" },
    mapEmbedUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
