#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

// Apply only explicitly reviewed group records. Coauthorship is not group ownership.
function applyReviewedPublications(current, review) {
  const result = current.map((record) => ({ ...record }));
  const fields = [
    "title",
    "authors",
    "shortAuthors",
    "authorNames",
    "journal",
    "year",
    "sortDate",
    "doi",
    "url",
    "abstract",
    "keyFindings",
    "projects",
    "tags",
    "featured",
    "preprint",
    "source",
    "verified",
    "version",
    "versionDate",
  ];
  for (const candidate of review.publications) {
    if (candidate.approved !== true || candidate.action === "skip") continue;
    if (!["new", "enhance"].includes(candidate.action))
      throw new Error("Unknown publication action");
    const index = result.findIndex(
      (record) => record.id === candidate.existingId,
    );
    if (candidate.action === "enhance" && index < 0)
      throw new Error(`Unknown existing publication: ${candidate.existingId}`);
    if (candidate.action === "new" && candidate.group !== "cipher")
      throw new Error(
        'New records need group: "cipher" after checking group ownership. TB and PEARL remain separate.',
      );
    const updates = Object.fromEntries(
      fields
        .filter(
          (field) =>
            candidate[field] !== undefined && candidate[field] !== null,
        )
        .map((field) => [field, candidate[field]]),
    );
    const record = { ...(index >= 0 ? result[index] : {}), ...updates };
    record.id =
      index >= 0
        ? result[index].id
        : candidate.id || candidate.pmid || candidate.doi;
    record.year = String(record.year);
    for (const field of [
      "id",
      "title",
      "authors",
      "journal",
      "doi",
      "url",
      "sortDate",
      "source",
      "verified",
    ]) {
      if (!record[field] || typeof record[field] !== "string")
        throw new Error(`Missing verified ${field}: ${candidate.title}`);
    }
    if (
      !/^\d{4}$/.test(record.year) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(record.sortDate)
    )
      throw new Error("Use citation year and an ISO sorting date");
    if (
      typeof record.preprint !== "boolean" ||
      !Array.isArray(record.projects) ||
      !Array.isArray(record.tags) ||
      !Array.isArray(record.authorNames) ||
      !record.authorNames.length
    )
      throw new Error(
        "Review publication status, authors, project assignments, and tags explicitly",
      );
    if (
      record.projects.some((project) =>
        ["pearl", "tb"].includes(project.toLowerCase()),
      )
    )
      throw new Error("TB and PEARL are outside the current CIPHER archive");
    if (index >= 0) result[index] = record;
    else result.push(record);
  }
  for (const key of ["id", "doi"]) {
    const values = result.map((record) => record[key].toLowerCase());
    if (new Set(values).size !== values.length)
      throw new Error(
        `Duplicate publication ${key}; update the existing record instead`,
      );
  }
  return result.sort(
    (a, b) =>
      Number(b.year) - Number(a.year) || b.sortDate.localeCompare(a.sortDate),
  );
}

if (require.main === module) {
  try {
    const file = path.join(__dirname, "../src/data/publication-records.json");
    const review = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../src/data/publications-review.json"),
        "utf8",
      ),
    );
    const current = JSON.parse(fs.readFileSync(file, "utf8"));
    const updated = applyReviewedPublications(current, review);
    fs.copyFileSync(file, `${file}.backup`);
    fs.writeFileSync(file, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(
      `Saved ${updated.length} curated publications. Backup: ${file}.backup`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { applyReviewedPublications };
