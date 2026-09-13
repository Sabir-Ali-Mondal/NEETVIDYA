import { Send } from "lucide-react";

const TelegramLink = ({ username = "neetvidya_official", label = "Join Telegram", className = "" }) => {
  const cleanUsername = username.replace("@", "");
  const url = `https://t.me/${cleanUsername}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors ${className}`}
    >
      <Send className="w-4 h-4 text-sky-500" />
      {label}
    </a>
  );
};

export default TelegramLink;
