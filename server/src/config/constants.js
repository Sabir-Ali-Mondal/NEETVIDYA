// Central application constants — single source of truth.

// Constant password used for every admin-created teacher/student account.
// The user is forced to change it on first login (see User.mustChangePassword).
const DEFAULT_PASSWORD = "Neetvidya@123";

// Default subject catalogue used by the Faculty Library (Unit → Chapter → Material).
// "Other" lets a teacher type a custom subject which is then persisted for next time.
const DEFAULT_SUBJECTS = ["Biology", "Physics", "Chemistry", "Mathematics"];
const CUSTOM_SUBJECT_LABEL = "Other";

module.exports = {
  DEFAULT_PASSWORD,
  DEFAULT_SUBJECTS,
  CUSTOM_SUBJECT_LABEL,
};
