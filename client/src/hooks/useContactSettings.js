import { useEffect, useState } from "react";
import api from "../config/api";

const defaultSettings = {
  instituteEmail: "neetvidya720@gmail.com",
  institutePhone: "+91 74396 85658 / +91 83910 21878",
  address: "Karimpur Main Road, Karimpur, Nadia",
  city: "Karimpur",
  state: "Nadia",
  telegramChannelLink: "https://t.me/neetvidya720official",
  whatsappGroupLink: "",
  whatsappNumber: "917439685658",
  whatsappDefaultMessage: "Hello NEETVIDYA! I am interested in admission.",
  facebookLink: "",
  instagramLink: "",
  youtubeLink: "",
  officeHours: "Mon - Sat: 9:00 AM - 6:00 PM",
  mapEmbedUrl: "",
};

export default function useContactSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/contact-settings");
        if (data?.data?.settings) {
          setSettings({ ...defaultSettings, ...data.data.settings });
        }
      } catch (error) {
        console.error("Failed to load contact settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
