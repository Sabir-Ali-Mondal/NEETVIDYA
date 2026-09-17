import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen, FileText, Download, ExternalLink, Search,
  ChevronDown, ChevronRight, Layers, FolderOpen, Video, Link as LinkIcon,
} from "lucide-react";

export default function LearnPage() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedUnits, setExpandedUnits] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/materials/tree");
      setTree(data.data?.tree || []);
    } catch {
      setTree([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = (id) => setExpandedUnits((p) => ({ ...p, [id]: !p[id] }));
  const toggleChapter = (id) => setExpandedChapters((p) => ({ ...p, [id]: !p[id] }));

  const q = search.trim().toLowerCase();
  const filteredTree = q
    ? tree
        .map((u) => ({
          ...u,
          chapters: u.chapters
            .map((c) => ({
              ...c,
              materials: c.materials.filter(
                (m) =>
                  m.title?.toLowerCase().includes(q) ||
                  m.description?.toLowerCase().includes(q)
              ),
            }))
            .filter((c) => c.materials.length > 0),
        }))
        .filter((u) => u.chapters.length > 0)
    : tree;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Digital Learning Center</h1>
        <p className="text-xs text-gray-500 mt-1">
          Your batch materials, organised as Unit → Chapter → Material.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search materials..."
          className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredTree.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No materials available yet</h3>
          <p className="text-slate-400 text-sm">
            Your teachers will publish materials for your batch here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTree.map((unit) => {
            const unitOpen = expandedUnits[unit._id] ?? true;
            return (
              <div key={unit._id} className="bg-white border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleUnit(unit._id)}
                  className="w-full flex items-center gap-3 p-5 hover:bg-slate-50 transition text-left"
                >
                  {unitOpen ? (
                    <ChevronDown className="w-5 h-5 text-green-600 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <Layers className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="font-bold text-brand-dark">{unit.name}</span>
                  <span className="ml-auto text-xs text-slate-400">
                    {unit.chapters.reduce((n, c) => n + c.materials.length, 0)} materials
                  </span>
                </button>

                {unitOpen && (
                  <div className="border-t border-slate-50">
                    {unit.chapters.map((chapter) => {
                      const chapOpen = expandedChapters[chapter._id] ?? true;
                      return (
                        <div key={chapter._id} className="pl-4 sm:pl-6">
                          <button
                            onClick={() => toggleChapter(chapter._id)}
                            className="w-full flex items-center gap-2 px-5 py-3 bg-slate-50/60 hover:bg-slate-100/60 transition text-left"
                          >
                            {chapOpen ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                            <FolderOpen className="w-4 h-4 text-slate-400" />
                            <span className="font-semibold text-slate-600 text-sm">{chapter.name}</span>
                            <span className="text-xs text-slate-400 ml-1">({chapter.materials.length})</span>
                          </button>

                          {chapOpen && (
                            <div className="divide-y divide-slate-50">
                              {chapter.materials.map((mat) => (
                                <div key={mat._id} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 transition">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border-emerald-100 flex items-center justify-center shrink-0">
                                      {mat.type === "VIDEO" ? (
                                        <Video className="w-4 h-4 text-emerald-600" />
                                      ) : mat.type === "LINK" ? (
                                        <LinkIcon className="w-4 h-4 text-emerald-600" />
                                      ) : (
                                        <FileText className="w-4 h-4 text-emerald-600" />
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-brand-dark truncate">{mat.title}</p>
                                      <p className="text-xs text-gray-400 truncate">
                                        {mat.description || mat.subject?.name || mat.type || "Material"}
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    href={mat.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition inline-flex items-center gap-1 shrink-0"
                                  >
                                    {mat.type === "VIDEO" ? (
                                      <>
                                        <Video className="w-3.5 h-3.5" /> Watch
                                      </>
                                    ) : mat.fileUrl?.includes("drive.google") ||
                                      mat.fileUrl?.includes("youtube") ||
                                      mat.fileUrl?.includes("youtu.be") ? (
                                      <>
                                        <ExternalLink className="w-3.5 h-3.5" /> Open
                                      </>
                                    ) : (
                                      <>
                                        <Download className="w-3.5 h-3.5" /> View
                                      </>
                                    )}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

