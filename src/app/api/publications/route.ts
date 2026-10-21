/**
 * Publications API Endpoint
 *
 * Provides REST API access to publication data with filtering capabilities.
 * This endpoint serves as a unified source of truth for publications across
 * multiple frontend applications (group website, JHEEM portal, etc.).
 *
 * Query Parameters:
 * - project: Filter by project ID (e.g., "jheem", "shield")
 * - year: Filter by publication year (e.g., "2024")
 * - tag: Filter by tag (e.g., "HIV", "modeling")
 * - featured: Return only featured publications (true/false)
 * - limit: Limit number of results (default: all)
 *
 * Examples:
 * - /api/publications - All publications
 * - /api/publications?project=jheem - JHEEM publications only
 * - /api/publications?project=jheem&featured=true - Featured JHEEM pubs
 * - /api/publications?year=2024&tag=HIV - 2024 HIV publications
 */

import { NextRequest, NextResponse } from "next/server";
import { getPublications } from "@/lib/data/publications";

// Enable CORS for cross-origin requests (e.g., from JHEEM portal)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const projectFilter = searchParams.get("project");
    const yearFilter = searchParams.get("year");
    const tagFilter = searchParams.get("tag");
    const featuredFilter = searchParams.get("featured");
    const limitParam = searchParams.get("limit");
    const recentParam = searchParams.get("recent");

    let publications = await getPublications();
    if (projectFilter)
      publications = publications.filter((p) =>
        p.projects.includes(projectFilter),
      );
    if (yearFilter)
      publications = publications.filter((p) => p.year === yearFilter);
    if (tagFilter)
      publications = publications.filter((p) => p.tags.includes(tagFilter));
    if (featuredFilter === "true")
      publications = publications.filter((p) => p.featured);
    if (featuredFilter === "false")
      publications = publications.filter((p) => !p.featured);

    // Filter first, then limit; featured + project must never leak other projects.
    const rawLimit = recentParam ?? limitParam;
    if (rawLimit !== null) {
      const limit = Number(rawLimit);
      if (!Number.isSafeInteger(limit) || limit < 1) {
        return NextResponse.json(
          { error: "Limit must be a positive integer" },
          { status: 400, headers: corsHeaders },
        );
      }
      publications = publications.slice(0, limit);
    }

    // Return response with CORS headers
    return NextResponse.json(
      {
        count: publications.length,
        publications,
      },
      {
        headers: {
          ...corsHeaders,
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Publications API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
