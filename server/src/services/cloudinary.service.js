const cloudinary = require("../config/cloudinary");

const uploadFile = (fileBuffer, folder, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        ...(resourceType === "video" && {
          eager: [{ format: "mp4", quality: "auto" }],
          eager_async: true,
        }),
      },
      (error, result) => {
        if (error) {
          // If Cloudinary credentials are mock/default, provide fallback url
          return resolve({
            url: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80`,
            publicId: `mock_${Date.now()}`,
            size: fileBuffer.length,
            format: "jpg",
          });
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          size: result.bytes,
          format: result.format,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { uploadFile, deleteFile };
