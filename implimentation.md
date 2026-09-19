Yes. If you want a **real PDF generated directly in JavaScript**, don't generate HTML and don't depend on the browser print dialog.

For NEETVIDYA, use:

* `jspdf` → PDF generation
* `jspdf-autotable` → professional tables
* Direct `.pdf` download
* A4 landscape layout for result sheets
* NEETVIDYA branding
* Logo
* Header
* Summary cards
* Ranking table
* Alternating rows
* Status badges
* Page numbers
* Repeated table headers
* Automatic multi-page handling
* No HTML file
* No print dialog
* No other component changes

### 1. Install these two packages

From your frontend/client folder:

```bash
npm install jspdf jspdf-autotable
```

### 2. Replace your utility with this

```js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import images from "../config/images";

const escapeValue = (value, fallback = "—") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

const getLogoDataUrl = async (url) => {
  if (!url) return null;

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const downloadExamResultSheet = async ({
  examTitle = "Exam Results",
  rows = [],
  batchName = "",
  instituteName = "NEETVIDYA",
  generatedAt = new Date(),
}) => {
  if (!rows.length) return;

  /*
   * -----------------------------------------
   * SORT RESULTS
   * -----------------------------------------
   */

  const sortedRows = [...rows]
    .sort((a, b) => {
      const scoreDiff =
        (b.obtainedMarks || 0) -
        (a.obtainedMarks || 0);

      if (scoreDiff !== 0) {
        return scoreDiff;
      }

      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );
    })
    .map((row, index) => ({
      ...row,
      rank: index + 1,
    }));

  /*
   * -----------------------------------------
   * BASIC DATA
   * -----------------------------------------
   */

  const safeExamTitle =
    examTitle || "Exam Results";

  const safeInstitute =
    instituteName || "NEETVIDYA";

  const safeBatch =
    batchName || "General";

  const highestScore =
    sortedRows[0]?.obtainedMarks || 0;

  const averageScore = sortedRows.length
    ? Math.round(
        sortedRows.reduce(
          (sum, row) =>
            sum + Number(row.obtainedMarks || 0),
          0
        ) / sortedRows.length
      )
    : 0;

  const totalAttempts = rows.reduce(
    (sum, row) =>
      sum + Number(row.totalAttempts || 0),
    0
  );

  const publishedCount = sortedRows.filter(
    (row) => row.isPublished
  ).length;

  /*
   * -----------------------------------------
   * PDF
   * -----------------------------------------
   */

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 12;

  /*
   * -----------------------------------------
   * COLORS
   * -----------------------------------------
   */

  const colors = {
    black: [15, 23, 42],
    green: [15, 118, 110],
    greenLight: [236, 253, 245],
    lime: [190, 242, 100],
    white: [255, 255, 255],
    slate: [71, 85, 105],
    muted: [100, 116, 139],
    border: [226, 232, 240],
    soft: [248, 250, 252],
    emerald: [22, 163, 74],
    amber: [217, 119, 6],
  };

  /*
   * -----------------------------------------
   * LOGO
   * -----------------------------------------
   */

  const logoUrl =
    images.logo ||
    images.logoRoundedTransparent ||
    "";

  const logoData = await getLogoDataUrl(logoUrl);

  /*
   * -----------------------------------------
   * HELPERS
   * -----------------------------------------
   */

  const roundedRect = (
    x,
    y,
    w,
    h,
    radius,
    fillColor,
    strokeColor = null
  ) => {
    doc.setFillColor(...fillColor);

    if (strokeColor) {
      doc.setDrawColor(...strokeColor);
      doc.roundedRect(
        x,
        y,
        w,
        h,
        radius,
        radius,
        "FD"
      );
    } else {
      doc.roundedRect(
        x,
        y,
        w,
        h,
        radius,
        radius,
        "F"
      );
    }
  };

  const addPageNumber = () => {
    const currentPage =
      doc.internal.getNumberOfPages();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.muted);

    doc.text(
      `NEETVIDYA  •  Examination Report`,
      margin,
      pageHeight - 7
    );

    doc.text(
      `Page ${currentPage}`,
      pageWidth - margin,
      pageHeight - 7,
      {
        align: "right",
      }
    );
  };

  /*
   * -----------------------------------------
   * HEADER
   * -----------------------------------------
   */

  roundedRect(
    0,
    0,
    pageWidth,
    39,
    0,
    colors.black
  );

  /*
   * Green accent
   */

  doc.setFillColor(...colors.green);
  doc.rect(0, 36, pageWidth, 3, "F");

  /*
   * Logo
   */

  if (logoData) {
    try {
      doc.addImage(
        logoData,
        "PNG",
        margin,
        8,
        22,
        22
      );
    } catch {
      // Continue without logo
    }
  }

  /*
   * Institute
   */

  const brandX = logoData
    ? margin + 29
    : margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);

  doc.text(
    safeInstitute.toUpperCase(),
    brandX,
    12
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(...colors.white);

  doc.text(
    "EXAMINATION RESULT",
    brandX,
    21
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);

  doc.text(
    "Official student performance report",
    brandX,
    27
  );

  /*
   * Batch pill
   */

  roundedRect(
    pageWidth - margin - 45,
    10,
    45,
    16,
    8,
    [30, 41, 59]
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...colors.lime);

  doc.text(
    safeBatch.toUpperCase(),
    pageWidth - margin - 22.5,
    19.5,
    {
      align: "center",
    }
  );

  /*
   * -----------------------------------------
   * EXAM TITLE
   * -----------------------------------------
   */

  let y = 50;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...colors.black);

  const titleLines = doc.splitTextToSize(
    safeExamTitle,
    pageWidth - margin * 2 - 80
  );

  doc.text(titleLines, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...colors.muted);

  doc.text(
    `Generated ${formatDate(generatedAt)}`,
    pageWidth - margin,
    y,
    {
      align: "right",
    }
  );

  y += Math.max(10, titleLines.length * 7);

  /*
   * -----------------------------------------
   * SUMMARY CARDS
   * -----------------------------------------
   */

  const cardGap = 5;

  const cardWidth =
    (pageWidth - margin * 2 - cardGap * 3) /
    4;

  const cardHeight = 25;

  const cards = [
    {
      label: "STUDENTS",
      value: sortedRows.length,
      accent: colors.green,
    },
    {
      label: "HIGHEST SCORE",
      value: highestScore,
      accent: colors.emerald,
    },
    {
      label: "AVERAGE SCORE",
      value: averageScore,
      accent: [59, 130, 246],
    },
    {
      label: "TOTAL ATTEMPTS",
      value: totalAttempts,
      accent: colors.amber,
    },
  ];

  cards.forEach((card, index) => {
    const x =
      margin +
      index * (cardWidth + cardGap);

    roundedRect(
      x,
      y,
      cardWidth,
      cardHeight,
      4,
      colors.soft,
      colors.border
    );

    doc.setFillColor(...card.accent);
    doc.roundedRect(
      x,
      y,
      2.2,
      cardHeight,
      1,
      1,
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...colors.muted);

    doc.text(
      card.label,
      x + 8,
      y + 8
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...colors.black);

    doc.text(
      String(card.value),
      x + 8,
      y + 18
    );
  });

  y += cardHeight + 10;

  /*
   * -----------------------------------------
   * STATUS LINE
   * -----------------------------------------
   */

  roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    11,
    5,
    colors.greenLight
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...colors.green);

  doc.text(
    `${publishedCount} of ${sortedRows.length} student result${
      sortedRows.length === 1 ? "" : "s"
    } published`,
    margin + 7,
    y + 7
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.muted);

  doc.text(
    `Batch: ${safeBatch}`,
    pageWidth - margin - 7,
    y + 7,
    {
      align: "right",
    }
  );

  y += 18;

  /*
   * -----------------------------------------
   * TABLE
   * -----------------------------------------
   */

  const tableBody = sortedRows.map((row) => [
    `#${row.rank}`,
    escapeValue(row.studentId),
    escapeValue(row.studentName, "Student"),
    formatDate(row.createdAt),
    `${row.obtainedMarks ?? 0} / ${row.totalMarks || 0}`,
    String(row.totalAttempts || 0),
    row.isPublished ? "Published" : "Pending",
  ]);

  autoTable(doc, {
    startY: y,

    head: [
      [
        "Rank",
        "Student ID",
        "Student Name",
        "Latest Attempt",
        "Score",
        "Attempts",
        "Status",
      ],
    ],

    body: tableBody,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 8,
      textColor: colors.black,
      cellPadding: 3.2,
      lineColor: colors.border,
      lineWidth: 0.25,
      valign: "middle",
    },

    headStyles: {
      fillColor: colors.black,
      textColor: colors.white,
      fontStyle: "bold",
      fontSize: 7.5,
      cellPadding: 3.5,
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    bodyStyles: {
      minCellHeight: 9,
    },

    columnStyles: {
      0: {
        cellWidth: 17,
        halign: "center",
        fontStyle: "bold",
      },

      1: {
        cellWidth: 30,
      },

      2: {
        cellWidth: 55,
        fontStyle: "bold",
      },

      3: {
        cellWidth: 48,
      },

      4: {
        cellWidth: 32,
        halign: "center",
        fontStyle: "bold",
      },

      5: {
        cellWidth: 25,
        halign: "center",
      },

      6: {
        cellWidth: 28,
        halign: "center",
      },
    },

    margin: {
      left: margin,
      right: margin,
      bottom: 16,
    },

    didParseCell: (data) => {
      /*
       * Rank
       */

      if (
        data.section === "body" &&
        data.column.index === 0
      ) {
        const rank =
          sortedRows[data.row.index]?.rank;

        if (rank === 1) {
          data.cell.styles.textColor = [
            180, 83, 9,
          ];
        }

        if (rank === 2) {
          data.cell.styles.textColor = [
            100, 116, 139,
          ];
        }

        if (rank === 3) {
          data.cell.styles.textColor = [
            146, 64, 14,
          ];
        }
      }

      /*
       * Score
       */

      if (
        data.section === "body" &&
        data.column.index === 4
      ) {
        data.cell.styles.textColor =
          colors.green;
      }

      /*
       * Status
       */

      if (
        data.section === "body" &&
        data.column.index === 6
      ) {
        const row =
          sortedRows[data.row.index];

        if (row?.isPublished) {
          data.cell.styles.textColor =
            colors.emerald;
          data.cell.styles.fontStyle =
            "bold";
        } else {
          data.cell.styles.textColor =
            colors.amber;
          data.cell.styles.fontStyle =
            "bold";
        }
      }
    },

    didDrawPage: () => {
      addPageNumber();
    },
  });

  /*
   * -----------------------------------------
   * FINAL FOOTER
   * -----------------------------------------
   */

  const finalY =
    doc.lastAutoTable?.finalY ||
    pageHeight - 25;

  /*
   * Avoid putting footer content too close
   * to the bottom of a page.
   */

  if (finalY < pageHeight - 35) {
    doc.setDrawColor(...colors.border);

    doc.line(
      margin,
      finalY + 8,
      pageWidth - margin,
      finalY + 8
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...colors.muted);

    doc.text(
      "This document is generated from the NEETVIDYA examination result system.",
      margin,
      finalY + 15
    );

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.green);

    doc.text(
      safeInstitute,
      pageWidth - margin,
      finalY + 15,
      {
        align: "right",
      }
    );
  }

  /*
   * -----------------------------------------
   * DOWNLOAD
   * -----------------------------------------
   */

  const filename =
    `${safeExamTitle}`
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() ||
    "exam-results";

  doc.save(`${filename}-results.pdf`);
};
```

### Result

Instead of:

```text
exam-results.html
```

you'll now get:

```text
neet-physics-mock-test-results.pdf
```

and it is generated entirely in the browser.

The PDF structure will be approximately:

```text
┌──────────────────────────────────────────────────────────────┐
│ NEETVIDYA                         SANKALP                     │
│ EXAMINATION RESULT                                          │
│ Official student performance report                         │
├──────────────────────────────────────────────────────────────┤
│ NEET Full Syllabus Mock Test              Generated: ...    │
│                                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ STUDENTS │ │ HIGHEST  │ │ AVERAGE  │ │ ATTEMPTS │        │
│ │   120    │ │   682    │ │   421    │ │   184    │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                              │
│  118 of 120 student results published       Batch: SANKALP │
│                                                              │
│ ┌────┬────────┬──────────────┬──────────┬──────┬────┬──────┐ │
│ │Rank│Student │ Student Name │ Attempt  │Score │... │Status│ │
│ ├────┼────────┼──────────────┼──────────┼──────┼────┼──────┤ │
│ │ #1 │ NV001  │ Rahul Kumar  │ ...      │ 682  │ 2  │ Live │ │
│ │ #2 │ NV024  │ ...          │ ...      │ 671  │ 1  │ Live │ │
│ │ #3 │ NV018  │ ...          │ ...      │ 658  │ 2  │ Live │ │
│ └────┴────────┴──────────────┴──────────┴──────┴────┴──────┘ │
│                                                              │
│ NEETVIDYA · Examination Report                    Page 1    │
└──────────────────────────────────────────────────────────────┘
```

### One important change

Your function is now:

```js
downloadExamResultSheet(...)
```

but it is **async**, because the logo is loaded before embedding into the PDF.

So wherever you currently have:

```js
downloadExamResultSheet(data);
```

you can leave it exactly like that. JavaScript will execute the async function correctly; **you do not have to change the calling file** unless you specifically need to wait for completion.

This approach is much more suitable for your **admin result publishing/export feature** than HTML generation because the final artifact is an actual PDF generated by the application.
