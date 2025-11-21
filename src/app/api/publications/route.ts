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

import { NextRequest, NextResponse } from 'next/server';
import {
  getPublications,
  getFeaturedPublications,
  getPublicationsByProject,
  getPublicationsByYear,
  getPublicationsByTag,
  getRecentPublications,
} from '@/lib/data/publications';

// Enable CORS for cross-origin requests (e.g., from JHEEM portal)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const projectFilter = searchParams.get('project');
    const yearFilter = searchParams.get('year');
    const tagFilter = searchParams.get('tag');
    const featuredFilter = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const recentParam = searchParams.get('recent');

    let publications;

    // Handle different query patterns
    if (recentParam) {
      // Get recent publications
      const limit = parseInt(recentParam) || 5;
      publications = await getRecentPublications(limit);
    } else if (featuredFilter === 'true') {
      // Get featured publications
      const limit = limitParam ? parseInt(limitParam) : undefined;
      publications = await getFeaturedPublications(limit);
    } else if (projectFilter) {
      // Filter by project
      publications = await getPublicationsByProject(projectFilter);
    } else if (yearFilter) {
      // Filter by year
      publications = await getPublicationsByYear(yearFilter);
    } else if (tagFilter) {
      // Filter by tag
      publications = await getPublicationsByTag(tagFilter);
    } else {
      // Get all publications
      publications = await getPublications();
    }

    // Apply secondary filters if needed
    if (projectFilter && yearFilter) {
      // Combined filters: project + year
      publications = publications.filter(pub => pub.year === yearFilter);
    }

    if (projectFilter && tagFilter) {
      // Combined filters: project + tag
      publications = publications.filter(pub => pub.tags.includes(tagFilter));
    }

    if (yearFilter && tagFilter) {
      // Combined filters: year + tag
      publications = publications.filter(pub => pub.tags.includes(tagFilter));
    }

    // Apply limit if specified and not already limited
    if (limitParam && !recentParam && featuredFilter !== 'true') {
      const limit = parseInt(limitParam);
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
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Publications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
