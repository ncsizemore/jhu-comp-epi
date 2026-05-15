#!/usr/bin/env node
//
// Splits the monolithic calibration.json (~11 MB) into per-location files
// under public/data/global-aging/calibration/. The UI changes one location
// at a time, so per-location loading drops parse cost and peak heap from
// "everything" to "what the user is looking at."
//
// Run via `npm run split-calibration`, or import `splitCalibration` from
// `scripts/extract.js` to call it as part of a larger pipeline.

const fs = require('fs');
const path = require('path');

const DEFAULT_SRC = path.join(__dirname, '../public/data/global-aging/calibration.json');
const DEFAULT_OUT = path.join(__dirname, '../public/data/global-aging/calibration');

function splitCalibration(srcPath = DEFAULT_SRC, outDir = DEFAULT_OUT) {
  if (!fs.existsSync(srcPath)) {
    throw new Error(`split-calibration: source missing at ${srcPath}`);
  }

  const raw = fs.readFileSync(srcPath, 'utf8');
  const data = JSON.parse(raw);
  const locations = Object.keys(data);
  if (locations.length === 0) {
    throw new Error('split-calibration: source has no locations');
  }

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const written = [];
  for (const code of locations) {
    const out = path.join(outDir, `${code}.json`);
    const json = JSON.stringify(data[code]);
    fs.writeFileSync(out, json);
    written.push({ code, size: json.length });
  }
  return { sourceBytes: raw.length, written };
}

if (require.main === module) {
  const result = splitCalibration();
  const srcMb = (result.sourceBytes / 1024 / 1024).toFixed(2);
  const outMb = (result.written.reduce((s, w) => s + w.size, 0) / 1024 / 1024).toFixed(2);
  console.log(
    `split-calibration: ${result.written.length} files written ` +
    `(source=${srcMb} MB, output=${outMb} MB total)`,
  );
}

module.exports = { splitCalibration };
