const imageResize = (base64String, maxSize = 120) => {
  if (!base64String || !base64String.startsWith("data:image/")) {
    return null;
  }
  const sizeInBytes = Math.round((base64String.length * 3) / 4);
  if (sizeInBytes > 200 * 1024) {
    return null;
  }
  return base64String;
};

module.exports = imageResize;
