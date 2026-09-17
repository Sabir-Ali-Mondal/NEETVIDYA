import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable pagination control.
 * Props: page, totalPages, totalItems, pageSize, onPageChange, onPageSizeChange
 */
export default function Pagination({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) {
  const safeTotal = Math.max(1, totalPages || 1);

  // Build a compact page window: 1 … (p-1) p (p+1) … N
  const pages = [];
  const push = (v) => pages.push(v);
  if (safeTotal <= 7) {
    for (let i = 1; i <= safeTotal; i++) push(i);
  } else {
    push(1);
    if (page > 3) push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(safeTotal - 1, page + 1); i++) push(i);
    if (page < safeTotal - 2) push("…");
    push(safeTotal);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3">
      <div className="text-xs text-slate-500">
        {totalItems > 0 ? (
          <>
            Page <strong className="text-slate-700">{page}</strong> of{" "}
            <strong className="text-slate-700">{safeTotal}</strong> · {totalItems} items
            </>
            ) : (
            "No items"
        )}
          </div>

        <div className="flex items-center gap-2">
          {onPageSizeChange && (
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-xs border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pages.map((p, i) =>
              p === "…" ? (
                <span key={`gap-${i}`} className="px-1.5 text-slate-400 text-xs">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`min-w-[30px] px-2 py-1.5 rounded-lg text-xs font-semibold border transition ${p === page
                      ? "bg-green-600 text-white border-green-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(Math.min(safeTotal, page + 1))}
              disabled={page >= safeTotal}
              className="p-1.5 rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      );
}
