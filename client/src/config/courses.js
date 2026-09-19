import images from "./images";

/**
 * The institute's fixed course catalogue.
 *
 * NEETVIDYA offers exactly two programmes. The public site showcases them and
 * batch creation picks from this same list, so the two always agree. Previously
 * batches referenced a `Course` document, but the course-admin section was
 * removed, which left course selection with nothing to choose from.
 *
 * `value` is what gets stored on the batch record.
 */
export const DEFAULT_COURSES = [
  {
    value: "SANKALP",
    name: "Dropper and 12th – SANKALP",
    shortName: "SANKALP",
    targetClass: "Dropper / 12th",
    duration: "Complete 1 Year",
    feeAmount: 20000,
    batchType: "Offline",
    description:
      "A one-year intensive programme for droppers and Class 12 students, covering the complete NEET syllabus with daily practice and full-length mock tests.",
    features: [
      "Complete 1 Year",
      "₹20,000",
      "Offline",
    ],
    image: images.courseNeetDropper,
  },
  {
    value: "UDAAN",
    name: "11th – UDAAN",
    shortName: "UDAAN",
    targetClass: "11th",
    duration: "Complete 2 Years",
    feeAmount: 35000,
    batchType: "Offline",
    description:
      "A two-year foundation-to-advanced programme for Class 11 students, building concepts from NCERT basics through to NEET-level problem solving.",
    features: [
      "Complete 2 Years",
      "₹35,000",
      "Offline",
    ],
    image: images.courseClassXi,
  },
];

/** Convenience lookup used by batch cards/forms to show a readable course label. */
export const getCourseByValue = (value) =>
  DEFAULT_COURSES.find((c) => c.value === value) || null;

export default DEFAULT_COURSES;
