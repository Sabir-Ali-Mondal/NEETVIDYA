const Question = require("../models/Question");
const Result = require("../models/Result");
const Notification = require("../models/Notification");
const Exam = require("../models/Exam");
const ApiError = require("../utils/apiError");

const evaluateAttempt = async (attempt) => {
  if (attempt.status !== "IN_PROGRESS") {
    return await Result.findOne({ attempt: attempt._id });
  }

  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const subjectMap = {};
  const chapterMap = {};

  for (const answer of attempt.answers) {
    const question = await Question.findById(answer.question);
    if (!question) continue;

    const subjId = question.subject ? question.subject.toString() : "general";
    const chapId = question.chapter ? question.chapter.toString() : "general";

    if (!subjectMap[subjId]) {
      subjectMap[subjId] = { subject: question.subject, correct: 0, wrong: 0, unattempted: 0, marks: 0 };
    }
    if (!chapterMap[chapId]) {
      chapterMap[chapId] = { chapter: question.chapter, correct: 0, wrong: 0, unattempted: 0 };
    }

    if (answer.selectedOption === null || answer.selectedOption === undefined || answer.selectedOption === -1) {
      unattemptedCount++;
      subjectMap[subjId].unattempted++;
      chapterMap[chapId].unattempted++;
    } else if (answer.selectedOption === question.correctAnswer) {
      correctCount++;
      totalScore += question.marks;
      subjectMap[subjId].correct++;
      subjectMap[subjId].marks += question.marks;
      chapterMap[chapId].correct++;
    } else {
      wrongCount++;
      totalScore -= question.negativeMarks;
      subjectMap[subjId].wrong++;
      subjectMap[subjId].marks -= question.negativeMarks;
      chapterMap[chapId].wrong++;
    }
  }

  const totalQuestions = attempt.answers.length;
  const accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
  const timeTaken = attempt.submittedAt
    ? Math.round((new Date(attempt.submittedAt) - new Date(attempt.startedAt)) / 1000)
    : 0;

  attempt.totalScore = totalScore;
  attempt.correctCount = correctCount;
  attempt.wrongCount = wrongCount;
  attempt.unattemptedCount = unattemptedCount;
  attempt.accuracy = accuracy;
  attempt.timeTaken = timeTaken;
  await attempt.save();

  const exam = await Exam.findById(attempt.exam);
  const totalMarks = exam ? exam.totalMarks : totalQuestions * 4;

  const result = await Result.create({
    attempt: attempt._id,
    exam: attempt.exam,
    student: attempt.student,
    totalMarks,
    obtainedMarks: totalScore,
    correctCount,
    wrongCount,
    unattemptedCount,
    accuracy,
    timeTaken,
    percentage: totalMarks > 0 ? Math.max(0, Math.round((totalScore / totalMarks) * 100)) : 0,
    subjectBreakdown: Object.values(subjectMap),
    chapterBreakdown: Object.values(chapterMap),
  });

  await Notification.create({
    title: "Result Available",
    message: `Your result for "${exam ? exam.title : "Exam"}" is ready. Score: ${totalScore}/${totalMarks}`,
    type: "RESULT",
    targetStudents: [attempt.student],
  }).catch(() => {});

  return result;
};

module.exports = { evaluateAttempt };
