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
          // Production behaviour: surface the real failure instead of a dummy preview.
          const message =
            error.message || "Cloudinary upload failed. Check storage credentials.";
          const err = new Error(message);
          err.statusCode = 502;
          return reject(err);
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
