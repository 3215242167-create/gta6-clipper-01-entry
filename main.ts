// main.ts — the hand-in program for this make.fun entry (gta6-clipper-01).
//
// What the entry is: a short vertical GTA 6 clip that an AI agent found,
// cut, captioned and uploaded to YouTube as a public Short. On make.fun
// the video itself is the entry, and the file that names the video is
// VIDEO.json in this repository's root — its "url" field holds the
// video's address on YouTube.
//
// Why this program exists: the grader runs main.ts with the repository
// mounted as the bot directory and a fresh output directory beside it,
// then reads VIDEO.json out of the output directory to learn which video
// it has to score. So the one job here is a careful hand-over: take the
// VIDEO.json that sits next to this file and place an identical copy in
// the output directory, creating that directory first if it is not
// there yet.
//
// Both locations can be overridden through the environment, which is how
// the same file runs in the grader's container (defaults "/bot" and
// "/output") and in a local smoke test ("." and a scratch directory).

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath: string = join(botDir, "VIDEO.json");
const targetPath: string = join(outputDir, "VIDEO.json");

try {
  // recursive: true makes this a no-op when the directory already exists.
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  // A missing or unreadable VIDEO.json means there is no entry to hand
  // in at all, so say what went wrong on stderr and fail with exit 1
  // instead of letting the grader find an empty output directory.
  console.error(
    `main.ts: could not hand in VIDEO.json (${sourcePath} -> ${targetPath}): ${(err as Error).message}`,
  );
  process.exit(1);
}

// Verify what was actually handed in before reporting success: read the
// copy in the output directory back, parse it, and check that its "url"
// field holds a plausible YouTube address (a Shorts or youtu.be link).
// A malformed VIDEO.json would send the grader to the wrong video, so
// it is better to fail here, loudly, than to hand in a bad address.
let handedInUrl: string;
try {
  const parsed: unknown = JSON.parse(readFileSync(targetPath, "utf8"));
  const url: unknown = (parsed as { url?: unknown }).url;
  if (
    typeof url !== "string" ||
    !/^https:\/\/(www\.)?(youtube\.com\/shorts\/|youtu\.be\/)[\w-]+/.test(url)
  ) {
    throw new Error(`"url" is not a plausible YouTube address: ${String(url)}`);
  }
  handedInUrl = url;
} catch (err) {
  console.error(
    `main.ts: handed-in VIDEO.json failed verification: ${(err as Error).message}`,
  );
  process.exit(1);
}

console.log(`Handed in video: ${handedInUrl}`);
