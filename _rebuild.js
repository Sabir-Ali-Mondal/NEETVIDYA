const fs = require("fs");
const p = "server/src/services/notification.service.js";
let lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
// Line index 18 (0-based) is the broken push. Rebuild it with proper braces.
const OB = String.fromCharCode(123); // {
const CB = String.fromCharCode(125); // }
const DQ = String.fromCharCode(34); // "
const rebuilt =
  "    or.push(" +
  OB +
  " scope: " +
  DQ + "BATCH" + DQ +
  ", targetBatches: " +
  OB +
  " $in: batchIds " +
  CB +
  " +
  CB +
  ");";
lines[18] = rebuilt;
fs.writeFileSync(p, lines.join("\n"));
console.log("REBUILT LINE 19 ->", rebuilt);
