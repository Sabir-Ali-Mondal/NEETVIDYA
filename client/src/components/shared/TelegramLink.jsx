import { Send } from "lucide-react";

const normalizeTelegramUrl = (value) => {
  if (!value) return "";
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("@")) return `https://t.me/${trimmed.replace(/^@/, "")}`;
  if (trimmed.includes("t.me/")) return `https://${trimmed.replace(/^https?:\/\//i, "")}`;
  return `https://t.me/${trimmed.replace(/^\//, "")}`;
};

const TelegramLink = ({ url, label = "Telegram", className = "" }) => {
  const finalUrl = normalizeTelegramUrl(url);
  if (!finalUrl) return null;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors ${className}`}
    >
      <Send className="w-4 h-4" />
      {label}
    </a>
  );
};

export default TelegramLink;
