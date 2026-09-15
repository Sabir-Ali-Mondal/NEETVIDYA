export default function SkeletonLoader({ rows = 3, type = "card" }) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border-slate-100 p-6 animate-pulse">
            <div className="h-40 bg-slate-100 rounded-xl mb-4" />
            <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-slate-100 rounded w-1/2 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white rounded-2xl border-slate-100 p-6 animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
            <div className="flex-1">
              <div className="h-3 bg-slate-100 rounded w-1/3 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-1/4" />
            </div>
            <div className="h-6 bg-slate-100 rounded-full w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-100 rounded"
          style={{ width: `${80 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
