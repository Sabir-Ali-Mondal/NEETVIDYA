import { useState, useRef } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function FileUpload({
  onUpload,
  accept = ".pdf",
  maxSizeMB = 20,
  label = "Upload File",
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alertError(`File too large. Max ${maxSizeMB}MB allowed.`);
      return;
    }
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await onUpload(formData, (p) => setProgress(p));
      setUploaded(true);
      alertSuccess("File uploaded successfully");
      return response;
    } catch (err) {
      alertError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging
          ? "border-green-500 bg-green-50"
          : "border-slate-200 hover:border-green-300 hover:bg-slate-50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {uploaded ? (
        <div className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold text-sm">Uploaded Successfully</span>
        </div>
      ) : uploading ? (
        <div className="space-y-3">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-slate-500">{progress}%</span>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">{label}</p>
          <p className="text-xs text-slate-400 mt-1">
            Drag &amp; drop or click to browse (Max {maxSizeMB}MB)
          </p>
        </>
      )}
    </div>
  );
}
