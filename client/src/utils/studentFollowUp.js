// Builds a student-specific WhatsApp follow-up message for the admin.
// Uses every piece of context we actually have (registration source, course,
// batch, exam-permission status, last login) so the admin never sends a
// generic hard-coded line when richer data is available.

const clean = (value) => (value === undefined || value === null ? "" : String(value).trim());

export const buildStudentFollowUpMessage = (student, settings = {}) => {
  if (!student) return settings.whatsappDefaultMessage || "Hello NEETVIDYA! I am interested in admission.";

  const name = clean(student.user?.name) || "there";
  const email = clean(student.user?.email);
  const phone = clean(student.user?.phone || student.phone);
  const studentId = clean(student.studentId);
  const classLevel = clean(student.currentClass);
  const city = clean(student.city);
  const batches = (student.batches || []).map((b) => (typeof b === "object" ? b.name : b)).filter(Boolean);
  const source = student.registrationSource || {};

  // What they registered for (course / batch they showed interest in).
  const registeredFor = clean(source.courseName) || clean(student.registrationSource?.course?.name);
  const interestedBatch = clean(source.batchName) || clean(student.registrationSource?.batch?.name);

  // How they reached us.
  const sourceLabel = clean(source.label) || clean(source.page) || clean(source.referrer);
  const campaign = clean(source.campaign) || clean(source.utm?.utm_campaign);

  const lines = [];

  lines.push(`Hello ${name}, this is NEETVIDYA.`);
  lines.push("");
  lines.push("Thank you for registering with us and showing interest in NEETVIDYA. We'd love to help you get started.");

  lines.push("");
  lines.push("Here's what we have on your registration:");

  if (registeredFor) lines.push(`• Interested in: ${registeredFor}`);
  if (interestedBatch) lines.push(`• Batch of interest: ${interestedBatch}`);
  if (batches.length > 0) lines.push(`• Enrolled batch: ${batches.join(", ")}`);
  else lines.push("• Enrolled batch: not assigned yet");
  if (classLevel) lines.push(`• Class: ${classLevel}`);
  if (city) lines.push(`• City: ${city}`);
  if (studentId) lines.push(`• Student ID: ${studentId}`);

  // How they came to us.
  if (sourceLabel) lines.push(`• Came via: ${sourceLabel}`);
  if (campaign) lines.push(`• Campaign: ${campaign}`);
  if (source.referrer && source.referrer !== sourceLabel) lines.push(`• Referrer: ${source.referrer}`);

  // Why we're reaching out.
  const reasons = student.attentionReasons || [];
  if (reasons.length > 0) {
    lines.push("");
    lines.push(`We noticed a couple of things we can sort out for you:`);
    reasons.forEach((r) => lines.push(`- ${r}`));
  }

  lines.push("");
  lines.push("Please let us know how we can help you begin your NEET preparation. Thank you!");

  const signature = [email, phone].filter(Boolean).join(" / ");
  if (signature) {
    lines.push("");
    lines.push(`(Reg. contact: ${signature})`);
  }

  return lines.join("\n");
};

// Normalises a phone number into a wa.me-compatible, country-coded number.
// Handles Indian numbers entered without the +91 country code (10 digits).
const normalizeWhatsAppNumber = (raw) => {
  let digits = clean(raw).replace(/[^0-9]/g, "");
  if (!digits) return "";
  // 0XXXXXXXXXX (leading trunk 0) → drop it.
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  // Bare 10-digit Indian number → prefix 91.
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
};

// The student's own WhatsApp number (falls back through alternate fields).
export const resolveStudentWhatsAppNumber = (student) => {
  if (!student) return "";
  return normalizeWhatsAppNumber(
    student.user?.phone || student.phone || student.whatsappNumber
  );
};

// A ready-to-click WhatsApp link that opens a chat with the STUDENT (not the
// admin's own number) pre-filled with the follow-up message. Falls back to the
// institute number only when the student has no phone on record.
//
// `forceInstitute` sends to the institute instead (used when the student phone
// is missing) so the button is never silently broken.
export const buildStudentWhatsAppLink = (student, settings = {}) => {
  const studentNumber = resolveStudentWhatsAppNumber(student);
  const target = studentNumber || normalizeWhatsAppNumber(settings.whatsappNumber);
  const message = buildStudentFollowUpMessage(student, settings);
  return {
    href: target
      ? `https://wa.me/${target}?text=${encodeURIComponent(message)}`
      : "",
    number: target,
    isStudentNumber: !!studentNumber,
    message,
  };
};

export default buildStudentFollowUpMessage;
