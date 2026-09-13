const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateOptionOrder = (count = 4) => {
  const indices = Array.from({ length: count }, (_, i) => i);
  return shuffleArray(indices);
};

module.exports = { shuffleArray, generateOptionOrder };
