import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { publications } from '@/data/publications';
const { applyReviewedPublications } = createRequire(import.meta.url)('../../scripts/apply-publications.js');

describe('publication import maintenance', () => {
  it('preserves source, authors, and metadata when applying an approved correction', () => {
    const current = publications[0];
    const result = applyReviewedPublications([current], {publications:[{approved:true,action:'enhance',existingId:current.id,title:'Corrected title'}]});
    expect(result[0]).toEqual({...current,title:'Corrected title'});
    expect(current.title).not.toBe('Corrected title');
  });
  it('requires explicit group ownership and rejects duplicate DOIs before writing', () => {
    const candidate = {...publications[0], id:'new-record', approved:true, action:'new'};
    expect(() => applyReviewedPublications(publications, {publications:[candidate]})).toThrow('group');
    expect(() => applyReviewedPublications(publications, {publications:[{...candidate,group:'cipher'}]})).toThrow('Duplicate publication doi');
  });
});
