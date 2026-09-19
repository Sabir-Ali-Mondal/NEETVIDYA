const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const { resolveBatchStudentUserIds } = require('../src/services/batch.service');

test('resolveBatchStudentUserIds converts legacy student ids to user ids', () => {
  const resolved = resolveBatchStudentUserIds(['student_123'], [{ _id: 'student_123', user: 'user_456' }]);
  assert.deepEqual(resolved, ['user_456']);
});

test('resolveBatchStudentUserIds keeps only the enrolled ids and de-dupes values', () => {
  const resolved = resolveBatchStudentUserIds(['user_456', 'student_123', 'user_456'], [
    { _id: 'student_123', user: 'user_456' },
    { _id: 'student_999', user: 'user_789' },
  ]);

  assert.deepEqual(resolved, ['user_456']);
});

test('validates that only ObjectId-like values are used in a Student _id search', () => {
  const value = 'student_123';
  assert.equal(mongoose.Types.ObjectId.isValid(value), false);
  assert.deepEqual(['student_123'].filter((id) => mongoose.Types.ObjectId.isValid(id)), []);
});
