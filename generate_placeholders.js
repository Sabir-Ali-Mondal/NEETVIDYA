import fs from "fs";
import path from "path";

const targetDir = path.resolve("client/src/assets/images/placeholders");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const placeholders = [
  "hero-slide-1", "hero-slide-2", "hero-slide-3",
  "about-institute", "methodology-flow",
  "course-neet-foundation", "course-class-xi", "course-class-xii", "course-neet-dropper", "course-test-series",
  "teacher-1", "teacher-2", "teacher-3", "teacher-4", "teacher-5", "teacher-6",
  "testimonial-student-1", "testimonial-student-2", "testimonial-parent-1",
  "achievement-result-1", "achievement-result-2", "achievement-milestone-1",
  "test-series-banner", "contact-institute",
  "lecture-thumbnail-1", "lecture-thumbnail-2", "lecture-thumbnail-3",
  "student-avatar-default", "og-image",
  "login-side-image", "register-side-image",
  "empty-state-materials", "empty-state-tests", "empty-state-results",
];

const colors = [
  ["#0B0F0D", "#18A66A"],
  ["#111714", "#A8C900"],
  ["#0F281E", "#38E54D"],
  ["#1E1B4B", "#6366F1"],
  ["#1F2937", "#10B981"],
];

placeholders.forEach((name, idx) => {
  const [bg, accent] = colors[idx % colors.length];
  const label = name.replace(/-/g, " ").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="grad_${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="#050706" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#grad_${idx})" />
    <circle cx="400" cy="260" r="90" fill="${accent}" opacity="0.18" />
    <text x="400" y="270" fill="${accent}" font-family="Arial, sans-serif" font-weight="bold" font-size="28" text-anchor="middle">NEETVIDYA</text>
    <rect x="250" y="320" width="300" height="2" fill="${accent}" opacity="0.4" />
    <text x="400" y="360" fill="#E2E8F0" font-family="Arial, sans-serif" font-weight="600" font-size="18" text-anchor="middle">${label}</text>
  </svg>`;

  fs.writeFileSync(path.join(targetDir, `${name}.svg`), svg);
  fs.writeFileSync(path.join(targetDir, `${name}.jpg`), svg); // SVG content saved as fallback for Vite import
});

console.log("Created 34 placeholder assets in", targetDir);
