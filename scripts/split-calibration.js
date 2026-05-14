#!/usr/bin/env node
//
// Splits the monolithic calibration.json (~11 MB) into per-location files
// under public/data/global-aging/calibration/. The UI changes one location
// at a time, so per-location loading drops parse cost and peak heap from
// "everything" to "what the user is looking at."
//
// Run via `npm run split-calibration`. Idempotent: rewrites the output dir
// from scratch each invocation.

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../public/data/global-aging/calibration.json');
const OUT_DIR = path.join(__dirname, '../public/data/global-aging/calibration');

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`split-calibration: source missing at ${SRC}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(SRC, 'utf8');
  const data = JSON.parse(raw);
  const locations = Object.keys(data);
  if (locations.length === 0) {
    console.error('split-calibration: source has no locations');
    process.exit(1);
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let totalBytes = 0;
  for (const code of locations) {
    const out = path.join(OUT_DIR, `${code}.json`);
    const json = JSON.stringify(data[code]);
    fs.writeFileSync(out, json);
    totalBytes += json.length;
  }

  const srcMb = (raw.length / 1024 / 1024).toFixed(2);
  const outMb = (totalBytes / 1024 / 1024).toFixed(2);
  console.log(
    `split-calibration: ${locations.length} files written to ${path.relative(process.cwd(), OUT_DIR)} ` +
    `(source=${srcMb} MB, output=${outMb} MB total)`,
  );
}

main();
