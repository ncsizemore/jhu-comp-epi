import type { Publication } from "@/data/publications";

const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function filterPublications(
  records: Publication[],
  query = "",
  year = "",
) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return records.filter((record) => {
    if (year && record.year !== year) return false;
    const text = normalize(
      [
        record.title,
        record.authors,
        record.journal,
        ...record.tags,
        ...(record.authorNames ?? []).map((author) => author.name),
      ].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
