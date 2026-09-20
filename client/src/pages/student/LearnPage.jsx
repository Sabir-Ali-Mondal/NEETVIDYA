import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  FolderOpen,
  Video,
  Link as LinkIcon,
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

  const toggleUnit = (id) => {
    setExpandedUnits((p) => ({ ...p, [id]: !p[id] }));
  };

  const toggleChapter = (id) => {
    setExpandedChapters((p) => ({ ...p, [id]: !p[id] }));
  };

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

  const totalMaterials = filteredTree.reduce(
    (unitTotal, unit) =>
      unitTotal +
      unit.chapters.reduce(
        (chapterTotal, chapter) => chapterTotal + chapter.materials.length,
        0
      ),
    0
  );

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-black p-5 text-white shadow-xl shadow-slate-900/10 sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-brand-lime/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                Learning Center
              </span>

              <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Digital Learning Center
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px]">
                Access your batch materials, organised clearly by Unit,
                Chapter, and Material.
              </p>
            </div>

            {!loading && filteredTree.length > 0 && (
              <div className="flex shrink-0 items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:self-auto">
                <BookOpen className="h-4 w-4 text-brand-lime" />

                <div>
                  <div className="text-sm font-extrabold text-white">
                    {totalMaterials}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    Materials
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials, topics or descriptions..."
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          {q && (
            <div className="mt-2 px-1 text-[11px] font-medium text-slate-400">
              Showing results for{" "}
              <span className="font-bold text-brand-green">"{search}"</span>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-8 shadow-sm sm:p-12">
            <div className="mx-auto flex max-w-sm flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-brand-green border-t-transparent" />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-700">
                Loading your learning materials
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Please wait while we organise your resources.
              </p>
            </div>
          </div>
        ) : filteredTree.length === 0 ? (
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
              <BookOpen className="h-7 w-7" />
            </div>

            <h3 className="mt-5 font-heading text-lg font-extrabold text-slate-700">
              {q ? "No matching materials" : "No materials available yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {q
                ? "Try searching with a different keyword or topic."
                : "Your teachers will publish materials for your batch here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTree.map((unit) => {
              const unitOpen = expandedUnits[unit._id] ?? true;

              const materialCount = unit.chapters.reduce(
                (n, c) => n + c.materials.length,
                0
              );

              return (
                <div
                  key={unit._id}
                  className="min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Unit */}
                  <button
                    type="button"
                    onClick={() => toggleUnit(unit._id)}
                    className="flex min-h-[68px] w-full min-w-0 items-center gap-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                      {unitOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                      <Layers className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold text-brand-dark sm:text-base">
                        {unit.name}
                      </span>

                      <span className="mt-0.5 block text-[10px] text-slate-400">
                        {unit.chapters.length}{" "}
                        {unit.chapters.length === 1 ? "Chapter" : "Chapters"}
                      </span>
                    </span>

                    <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:inline-flex">
                      {materialCount}{" "}
                      {materialCount === 1 ? "material" : "materials"}
                    </span>
                  </button>

                  {unitOpen && (
                    <div className="border-t border-slate-100">
                      {unit.chapters.map((chapter) => {
                        const chapOpen =
                          expandedChapters[chapter._id] ?? true;

                        return (
                          <div
                            key={chapter._id}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            {/* Chapter */}
                            <button
                              type="button"
                              onClick={() => toggleChapter(chapter._id)}
                              className="flex min-h-[54px] w-full min-w-0 items-center gap-2.5 bg-slate-50/70 px-4 py-3 text-left transition hover:bg-slate-100 sm:px-6"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                                {chapOpen ? (
                                  <ChevronDown className="h-3.5 w-3.5" />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5" />
                                )}
                              </span>

                              <FolderOpen className="h-4 w-4 shrink-0 text-slate-400" />

                              <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-600 sm:text-sm">
                                {chapter.name}
                              </span>

                              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-slate-400 shadow-sm">
                                {chapter.materials.length}
                              </span>
                            </button>

                            {/* Materials */}
                            {chapOpen && (
                              <div className="divide-y divide-slate-100">
                                {chapter.materials.map((mat) => (
                                  <div
                                    key={mat._id}
                                    className="flex min-w-0 flex-col gap-3 px-4 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6"
                                  >
                                    <div className="flex min-w-0 items-center gap-3">
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                                        {mat.type === "VIDEO" ? (
                                          <Video className="h-4 w-4" />
                                        ) : mat.type === "LINK" ? (
                                          <LinkIcon className="h-4 w-4" />
                                        ) : (
                                          <FileText className="h-4 w-4" />
                                        )}
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-bold text-brand-dark">
                                          {mat.title}
                                        </p>

                                        <p className="mt-0.5 truncate text-[11px] text-slate-400">
                                          {mat.description ||
                                            mat.subject?.name ||
                                            mat.type ||
                                            "Material"}
                                        </p>
                                      </div>
                                    </div>

                                    <a
                                      href={mat.fileUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="flex min-h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] font-extrabold text-emerald-700 transition hover:bg-emerald-100 sm:w-auto"
                                    >
                                      {mat.type === "VIDEO" ? (
                                        <>
                                          <Video className="h-3.5 w-3.5" />
                                          Watch
                                        </>
                                      ) : mat.fileUrl?.includes(
                                          "drive.google"
                                        ) ||
                                        mat.fileUrl?.includes("youtube") ||
                                        mat.fileUrl?.includes("youtu.be") ? (
                                        <>
                                          <ExternalLink className="h-3.5 w-3.5" />
                                          Open
                                        </>
                                      ) : (
                                        <>
                                          <Download className="h-3.5 w-3.5" />
                                          View
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
    </div>
  );
}