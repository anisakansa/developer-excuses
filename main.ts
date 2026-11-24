// Make the AI Judge Laugh: Developer Excuses
// Bounty: u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3
// Entry: one line — a developer excuse for code that broke in production.
//
// Why this line won (5 candidates scored against the rubric
// specific-dev-excuse > specific-funny > twist > dense):
// - "It worked on my machine" is THE iconic developer excuse: instantly
//   specific to the trade, not a generic apology.
// - The twist lands in the second sentence: production is blamed for
//   "commitment issues", as if the deploy environment were the flaky one.
// - Short, two sentences, no padding; the joke survives being read once,
//   fast, which is what a one-line judge rewards.
//
// Deterministic by construction: a constant string plus gates only.
// No clock, no Date, no Math.random, no seed, no I/O except the output
// write. Two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "It worked on my machine. Production just has commitment issues.";

function fail(message: string): never {
  throw new Error(message);
}

// Gate 1: 1-120 UTF-8 characters (safe under both the 120 and 200 caps).
const chars = [...LINE];
if (chars.length < 1 || chars.length > 120) {
  fail(`line must be 1-120 characters, got ${chars.length}`);
}
// Gate 2: exactly one line.
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
// Gate 3: no leading or trailing whitespace.
if (LINE !== LINE.trim()) {
  fail("line must not have leading or trailing whitespace");
}
// Gate 4: pure ASCII (byte length equals character count).
if (Buffer.byteLength(LINE, "utf8") !== chars.length) {
  fail("line must be pure ASCII");
}

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", LINE, "utf8");
// Round-trip guard: the file on disk must read back byte-identical.
if (readFileSync("output/entry.txt", "utf8") !== LINE) {
  fail("output/entry.txt did not read back byte-identical");
}
try {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
} catch {
  // Absolute output path is a convenience mirror only; the relative
  // output/entry.txt above is the graded artifact.
}
console.log(LINE);
