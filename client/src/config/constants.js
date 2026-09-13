export const ROLES = { STUDENT: "student", TEACHER: "teacher", ADMIN: "admin" };

export const TEST_TYPES = {
  DPP: "DPP", CHAPTER_TEST: "CHAPTER_TEST", UNIT_TEST: "UNIT_TEST",
  MOCK_TEST: "MOCK_TEST", PYQ: "PYQ",
};

export const BATCH_TYPES = {
  OFFLINE: "OFFLINE", ONLINE: "ONLINE", HYBRID: "HYBRID",
  EXAM_ONLY: "EXAM_ONLY", CRASH_COURSE: "CRASH_COURSE",
};

export const STUDENT_TYPES = {
  REGULAR_OFFLINE: "REGULAR_OFFLINE", REGULAR_ONLINE: "REGULAR_ONLINE",
  HYBRID: "HYBRID", EXAM_ONLY: "EXAM_ONLY", GUEST: "GUEST",
};

export const EXAM_STATUS = {
  DRAFT: "DRAFT", SCHEDULED: "SCHEDULED", LIVE: "LIVE", CLOSED: "CLOSED",
};

export const RESOURCE_TYPES = {
  EXTERNAL_LINK: "EXTERNAL_LINK", YOUTUBE: "YOUTUBE", GOOGLE_DRIVE: "GOOGLE_DRIVE",
  REFERENCE_SITE: "REFERENCE_SITE", TOOL: "TOOL", CUSTOM: "CUSTOM",
};

export const BATCH_BADGE_CONFIG = {
  OFFLINE: { label: "Offline", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  ONLINE: { label: "Online", color: "bg-purple-50 text-purple-700 border border-purple-200" },
  HYBRID: { label: "Hybrid", color: "bg-amber-50 text-amber-800 border border-amber-200" },
  EXAM_ONLY: { label: "Exam Only", color: "bg-orange-50 text-orange-700 border border-orange-200" },
  CRASH_COURSE: { label: "Crash Course", color: "bg-rose-50 text-rose-700 border border-rose-200" },
};
