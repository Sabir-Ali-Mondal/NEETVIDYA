import { useState } from "react";
import { Download, X, Maximize2 } from "lucide-react";

export default function PDFViewer({ url, title, onClose }) {
  const [fullscreen, setFullscreen] = useState(false);

  if (!url) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex-col ${fullscreen ? "" : "p-4"}`}>
      <div className="bg-white rounded-t-2xl px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm truncate max-w-[60%]">
          {title || "Document Viewer"}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <a
            href={url}
            download
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Download className="w-4 h-4" />
          </a>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <iframe src={url} className="flex-1 w-full bg-white" title={title} />
    </div>
  );
}
