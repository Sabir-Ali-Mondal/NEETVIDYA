export const generateExamResultPdf = ({ examTitle = "Exam Results", rows = [] }) => {
  if (!rows.length) return;

  const cleanRows = rows.map((row, index) => ({
    rank: row.rank || index + 1,
    studentId: row.studentId || row.student?.studentId || "—",
    studentName: row.student?.name || "Student",
    score: `${row.obtainedMarks ?? 0} / ${row.totalMarks || row.exam?.totalMarks || 0}`,
    status: row.isPublished ? "Published" : "Pending",
    date: row.createdAt ? new Date(row.createdAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) : "—",
  }));

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${examTitle}</title>
        <style>
          :root {
            --bg: #f8fafc;
            --paper: #ffffff;
            --ink: #0f172a;
            --muted: #64748b;
            --line: #e2e8f0;
            --green: #16a34a;
            --amber: #d97706;
            --brand: #0f766e;
          }

          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: var(--bg);
            color: var(--ink);
            padding: 28px;
          }

          .sheet {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            background: var(--paper);
            border: 1px solid var(--line);
            border-radius: 18px;
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            padding: 28px 30px 20px;
            background: linear-gradient(135deg, #0f172a 0%, #0f766e 100%);
            color: white;
          }

          .title {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }

          .subtitle {
            margin: 10px 0 0;
            font-size: 13px;
            opacity: 0.8;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            padding: 18px 30px 0;
            margin-top: -12px;
          }

          .stat {
            background: #f8fafc;
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 14px 18px;
          }

          .stat-label {
            display: block;
            font-size: 11px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 6px;
          }

          .stat-value {
            font-size: 22px;
            font-weight: 700;
          }

          .table-wrap {
            padding: 20px 30px 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--line);
            border-radius: 12px;
            overflow: hidden;
          }

          th, td {
            padding: 14px 12px;
            border-bottom: 1px solid var(--line);
            text-align: left;
            font-size: 13px;
          }

          th {
            background: #f8fafc;
            color: var(--muted);
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          tbody tr:nth-child(even) {
            background: #fafafa;
          }

          .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid transparent;
          }

          .published {
            background: rgba(22, 163, 74, 0.1);
            color: var(--green);
            border-color: rgba(22, 163, 74, 0.2);
          }

          .pending {
            background: rgba(217, 119, 6, 0.1);
            color: var(--amber);
            border-color: rgba(217, 119, 6, 0.2);
          }

          .rank {
            font-weight: 700;
            color: var(--brand);
          }

          @media print {
            body {
              background: white;
              padding: 0;
            }
            .sheet {
              box-shadow: none;
              border: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="header">
            <div class="subtitle">Exam leaderboard</div>
            <h1 class="title">${examTitle}</h1>
          </div>

          <div class="stats">
            <div class="stat">
              <span class="stat-label">Students</span>
              <span class="stat-value">${cleanRows.length}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Highest Score</span>
              <span class="stat-value">${cleanRows[0]?.score || "0 / 0"}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Generated</span>
              <span class="stat-value">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student ID</th>
                  <th>Student</th>
                  <th>Latest Attempt</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${cleanRows.map((row) => `
                  <tr>
                    <td class="rank">#${row.rank}</td>
                    <td>${row.studentId}</td>
                    <td>${row.studentName}</td>
                    <td>${row.date}</td>
                    <td>${row.score}</td>
                    <td>
                      <span class="badge ${row.status === "Published" ? "published" : "pending"}">${row.status}</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;

  const popup = window.open("", "_blank", "width=1200,height=900");
  if (!popup) return;

  popup.document.write(html);
  popup.document.close();
  setTimeout(() => {
    popup.focus();
    popup.print();
  }, 250);
};
