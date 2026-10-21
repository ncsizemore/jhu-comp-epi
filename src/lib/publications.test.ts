import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/publications/route';
import { publications, publicationYears } from '@/data/publications';
import { filterPublications } from '@/lib/publication-search';
import { getPublicationsByYear, getPublicationsByProject } from '@/lib/data/publications';

async function query(search: string) {
  return GET(new NextRequest(`https://cipher-epi.vercel.app/api/publications?${search}`));
}

describe('curated publication archive', () => {
  it('keeps TB and PEARL outside every archive query', async () => {
    expect(publications).toHaveLength(19);
    expect(new Set(publications.map(p => p.doi)).size).toBe(publications.length);
    expect(publications.some(p => /tuberculosis|pearl|microsimulation models/i.test(p.title))).toBe(false);
    expect(await getPublicationsByProject('pearl')).toEqual([]);
    expect((await getPublicationsByYear('2024')).every(p => p.doi !== '10.1371/journal.pmed.1004325')).toBe(true);
  });
  it('uses current citation years and keeps the remaining preprint labeled', () => {
    expect(publicationYears[0]).toBe('2026');
    expect(publications.find(p => p.id === 'zalesak-2025')).toMatchObject({year:'2026',preprint:false,journal:'AIDS'});
    expect(publications.filter(p => p.preprint).map(p => p.doi)).toEqual(['10.64898/2026.07.27.26359045']);
    expect(publications.map(p => `${p.year}-${p.sortDate}`)).toEqual(publications.map(p => `${p.year}-${p.sortDate}`).sort().reverse());
  });
  it('finds full author names and combines search with year', () => {
    const found = filterPublications(publications, 'Zoe Dansky', '2026');
    expect(found.map(p => p.doi)).toEqual(['10.1001/jamanetworkopen.2026.32299']);
    expect(filterPublications(publications, 'Zoe Dansky', '2025')).toEqual([]);
  });
  it('applies all API filters before limiting without changing its response shape', async () => {
    const response = await query('project=jheem&featured=true&year=2025&limit=1');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(body.count).toBe(1);
    expect(body.publications[0]).toMatchObject({id:'forster-2025',year:'2025',featured:true});
    const empty = await (await query('project=shield&featured=true')).json();
    expect(empty).toEqual({count:0,publications:[]});
  });
  it('rejects malformed limits instead of silently returning misleading results', async () => {
    expect((await query('limit=not-a-number')).status).toBe(400);
    expect((await query('recent=-1')).status).toBe(400);
  });
});
