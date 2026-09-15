import { MessageCircle } from "lucide-react";

const WhatsAppLink = ({ number = "917439685658", message = "Hello NEETVIDYA! I am interested in admission.", label = "WhatsApp Us", className = "" }) => {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4 text-emerald-500" />
      {label}
    </a>
  );
};

export default WhatsAppLink;
