# CIPHER Lab Domain Options

Created: 2026-06-29

## Goal

Choose a public URL that supports the CIPHER Lab rebrand while reducing
unnecessary dependence on Johns Hopkins naming in the visible site identity.

The site should still state the lab's Johns Hopkins affiliation clearly in page
copy and footer content. The domain does not need to carry the JHU brand.

## Working Principles

- Prefer a non-JHU primary URL for the new CIPHER identity.
- Keep the existing Vercel URLs working during transition.
- Do not set a canonical URL until the team has chosen the final direction.
- Avoid using `jheem` in the lab URL because the lab is broader than JHEEM.
- Avoid using several public aliases indefinitely without a canonical redirect
  plan.

## Temporary Vercel Alias Candidates

These are useful to reserve while the final custom-domain decision is pending.

| Alias | Read | Tradeoff |
| --- | --- | --- |
| `cipher-epi.vercel.app` | Added. Best short-term fit. Brand-forward, not JHU-branded, and more specific than CIPHER alone. | Uses abbreviation `epi`, which some broad audiences may not immediately parse. |
| `cipherpublichealth.vercel.app` | Added. Very clear to public-health audiences and less likely to be confused with cybersecurity. | Longer and less elegant. |
| `cipherlab.vercel.app` | Not added; reported unavailable in Vercel. Shortest and cleanest lab-name match. | More generic; `CIPHER` can suggest cryptography/cybersecurity. |
| `cipher-lab-jhu.vercel.app` | Clear affiliation and likely available. | Keeps JHU in the visible URL, which cuts against the separation goal. |
| `jhu-cipher-lab.vercel.app` | Clear and unambiguous. | Not recommended as primary because it foregrounds JHU branding. |

Already observed:

- `cipher-lab.vercel.app` appears to be in use by another Vercel deployment.
- `cipher-epi.vercel.app` and `cipherpublichealth.vercel.app` serve the current
  CIPHER build as of 2026-06-29.
- `cipherlab.vercel.app` was reported unavailable in Vercel and was not added.

## Custom Domain Candidates

| Domain | Read | Tradeoff |
| --- | --- | --- |
| `cipher-epi.org` | Current favorite. Short, brand-forward, and more specific than CIPHER alone. | `epi` is still an abbreviation. |
| `cipherpublichealth.org` | Strong clarity for broad audiences and policymakers. | Longer and less polished. |
| `cipher-epidemiology.org` | Very clear academically. | Long. |
| `cipherlab.org` | Cleanest direct lab-name match. | Generic and potentially confusable with non-public-health CIPHER groups. |
| `cipher-lab.org` | Readable direct lab-name match. | Generic; hyphen may be mildly less polished. |
| `ciphermodels.org` | Concise and relevant to modeling work. | May narrow the lab identity too much. |
| `cipherhealthmodels.org` | Descriptive and public-health adjacent. | Longer and less elegant. |

## Recommendation

Temporary canonical Vercel URL:

- `cipher-epi.vercel.app`

Reserved non-canonical alternate:

- `cipherpublichealth.vercel.app`

The old Vercel aliases should redirect to `cipher-epi.vercel.app` for now, but
the redirects should remain temporary rather than permanent because the lab is
likely to move to a custom domain later.

For the final domain, start by investigating:

1. `cipher-epi.org`
2. `cipherpublichealth.org`
3. `cipher-epidemiology.org`

## Implementation Notes

The repo can support the migration through environment variables once the final
URL is chosen:

- `NEXT_PUBLIC_SITE_URL`: canonical URL used for metadata.
- `SITE_LEGACY_HOSTS`: comma-separated old hosts that should redirect to the
  canonical URL.

The recommended implementation sequence is:

1. Use `cipher-epi.vercel.app` as the temporary canonical URL.
2. Keep `cipherpublichealth.vercel.app` serving the same site as an alternate.
3. Redirect old Vercel aliases to `cipher-epi.vercel.app`.
4. Choose a final custom domain later.
5. Update canonical metadata and redirects when the final custom domain is
   ready.

## Adding Vercel Aliases

There are two reasonable ways to reserve temporary Vercel aliases:

- **Dashboard:** Project settings, then Domains. This is likely the simplest
  path if someone is already logged into the right Vercel team/account.
- **CLI:** Possible with the Vercel CLI if the shell has an authenticated Vercel
  session or a `VERCEL_TOKEN`.

Useful CLI shapes from Vercel's docs:

```bash
vercel domains add [domain] [project]
vercel alias set [deployment-url] [custom-domain]
```

For this repo, the current shell does not have a Vercel auth token/session
available. That means adding aliases from here would require either logging in
with the Vercel CLI or using the Vercel web UI.
