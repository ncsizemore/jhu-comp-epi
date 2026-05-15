#!/usr/bin/env node
//
// Stages R-generated JSONs from a sibling gmha repo into this app.
//
// What it does:
//   1. Reads from ${GMHA_DIR}/web/json/   (defaults to ../gmha)
//   2. Copies metadata.json + summary.json -> src/data/global-aging/
//   3. Copies projections.json + observed.json -> public/data/global-aging/
//   4. Splits calibration.json into per-location files under
//      public/data/global-aging/calibration/<code>.json
//   5. Writes src/data/global-aging/manifest.json recording the source
//      .Rdata bundles and staged file sizes so drift is visible
//
// What it does NOT do: invoke R. Run `Rscript web/extract_for_web.R` in
// the gmha repo first (or `source(...)` inside an R session). This script
// is the staging half — it stays decoupled from the R toolchain so a
// missing R install doesn't break the web build.
//
// Override the source location with GMHA_DIR=... if your checkout isn't a
// sibling of jhu-comp-epi.
//
// Usage: npm run extract

const fs = require('fs');
const path = require('path');
const { splitCalibration } = require('./split-calibration');

const REPO_ROOT = path.resolve(__dirname, '..');
const GMHA_DIR = process.env.GMHA_DIR
  ? path.resolve(process.env.GMHA_DIR)
  : path.resolve(REPO_ROOT, '../gmha');

const GMHA_WEB = path.join(GMHA_DIR, 'web');
const GMHA_JSON = path.join(GMHA_WEB, 'json');

const PUBLIC_DATA = path.join(REPO_ROOT, 'public/data/global-aging');
const SRC_DATA = path.join(REPO_ROOT, 'src/data/global-aging');

// destination dir → list of files that go there from gmha/web/json/
const STAGE_PLAN = {
  [SRC_DATA]: ['metadata.json', 'summary.json'],
  [PUBLIC_DATA]: ['projections.json', 'observed.json'],
};

function rel(p) {
  return path.relative(process.cwd(), p) || '.';
}

function validateSource() {
  if (!fs.existsSync(GMHA_JSON)) {
    throw new Error(
      `source JSON dir not found at ${GMHA_JSON}\n` +
      `  Set GMHA_DIR=/path/to/gmha, or run \`Rscript web/extract_for_web.R\` in the gmha repo first.`,
    );
  }
  const required = ['metadata.json', 'projections.json', 'calibration.json', 'observed.json', 'summary.json'];
  const missing = required.filter(f => !fs.existsSync(path.join(GMHA_JSON, f)));
  if (missing.length) {
    throw new Error(`missing source files in ${GMHA_JSON}: ${missing.join(', ')}`);
  }
}

function copyOne(srcFile, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const src = path.join(GMHA_JSON, srcFile);
  const dest = path.join(destDir, srcFile);
  fs.copyFileSync(src, dest);
  return { srcFile, dest, size: fs.statSync(dest).size };
}

function stageAll() {
  const staged = [];
  for (const [destDir, files] of Object.entries(STAGE_PLAN)) {
    for (const f of files) {
      staged.push(copyOne(f, destDir));
    }
  }
  // Calibration: copy then split, then delete the monolithic intermediate
  // so we don't ship 11 MB twice.
  const calibStaging = path.join(PUBLIC_DATA, 'calibration.json');
  fs.copyFileSync(path.join(GMHA_JSON, 'calibration.json'), calibStaging);
  const splitResult = splitCalibration(calibStaging, path.join(PUBLIC_DATA, 'calibration'));
  fs.unlinkSync(calibStaging);
  return { staged, splitResult };
}

function listRdataBundles() {
  if (!fs.existsSync(GMHA_WEB)) return [];
  return fs.readdirSync(GMHA_WEB)
    .filter(f => f.endsWith('.Rdata'))
    .sort()
    .map(file => {
      const full = path.join(GMHA_WEB, file);
      const stat = fs.statSync(full);
      // Filenames embed an ISO date like ..._2025-08-25.Rdata
      const dateMatch = file.match(/_(\d{4}-\d{2}-\d{2})\.Rdata$/);
      return {
        file,
        date_from_filename: dateMatch ? dateMatch[1] : null,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      };
    });
}

function writeManifest({ staged, splitResult, bundles }) {
  const manifest = {
    generated_at: new Date().toISOString(),
    gmha_source_dir: GMHA_WEB,
    staged_files: [
      ...staged.map(s => ({ file: s.srcFile, dest: rel(s.dest), size: s.size })),
      ...splitResult.written
        .sort((a, b) => a.code.localeCompare(b.code))
        .map(w => ({
          file: `calibration/${w.code}.json`,
          dest: rel(path.join(PUBLIC_DATA, 'calibration', `${w.code}.json`)),
          size: w.size,
        })),
    ],
    source_bundles: bundles,
  };
  const dest = path.join(SRC_DATA, 'manifest.json');
  fs.writeFileSync(dest, JSON.stringify(manifest, null, 2) + '\n');
  return dest;
}

function main() {
  console.log(`extract: sourcing from ${GMHA_JSON}`);
  validateSource();

  const { staged, splitResult } = stageAll();
  for (const s of staged) {
    console.log(`  ${s.srcFile.padEnd(20)} -> ${rel(s.dest)} (${s.size.toLocaleString()} bytes)`);
  }
  console.log(`  calibration.json    -> ${rel(path.join(PUBLIC_DATA, 'calibration'))}/ (${splitResult.written.length} files)`);

  const bundles = listRdataBundles();
  const manifestDest = writeManifest({ staged, splitResult, bundles });
  console.log(`  manifest written     -> ${rel(manifestDest)} (${bundles.length} source bundles tracked)`);
}

try {
  main();
} catch (err) {
  console.error(`extract: ${err.message}`);
  process.exit(1);
}
