# Publication Figures

This directory contains figures extracted from publications for display on the website.

## File Naming Convention

**Pattern:** `{publication-id}-fig{N}.png`

Where:
- `{publication-id}` matches the ID in `src/data/publications.ts`
- `fig{N}` is the figure number from the paper (e.g., `fig1`, `fig2`, `fig3a`)

**Examples:**
- `althoff-2024-fig1.png` - Figure 1 from Althoff 2024
- `althoff-2024-fig2.png` - Figure 2 from Althoff 2024 (currently in use)
- `hyle-2023-fig2.png` - Figure 2 from Hyle 2023
- `fojo-2021-end-hiv-fig4.png` - Figure 4 from Fojo 2021

**Important:** Archive ALL extracted figures from each publication, even if not currently displayed on the website. This provides flexibility for future use (e.g., showing multiple figures in modals, different figures for different contexts).

## Format Guidelines

**Format:** PNG (preferred over TIFF)
- Web-optimized and natively supported by all browsers
- Automatically optimized by Next.js Image component
- Smaller file sizes for better page performance

**Export Settings:**
- Resolution: 300 DPI minimum
- Color mode: RGB
- Compression: Lossless (PNG default)

## Usage in Code

Reference these images in `src/data/publications.ts`:

```typescript
{
  id: "althoff-2024",
  // ... other fields
  imageUrl: "/images/publications/althoff-2024-fig2.png",
  imageCaption: "Figure 2: Forecasted prevalence of comorbidities and multimorbidity in PWH using ART"
}
```

**Note:** Only specify the primary figure to display in `imageUrl`. Additional figures can be archived without being referenced in the data file.

## Copyright Notice

These figures are extracted from publications authored by team members for display on the official research group website. Ensure proper attribution and respect copyright guidelines when using figures from published work.

## Current Figures

### Althoff 2024 (PLoS Medicine)
- [x] `althoff-2024-fig1.png` - Figure 1 (archived)
- [x] `althoff-2024-fig2.png` - Figure 2 (in use)

### Hyle 2023 (J Infect Dis)
- [x] `hyle-2023-fig2.png` - Figure 2 (in use)

### Althoff 2021 (AIDS)
- [x] `althoff-2021-fig3a.png` - Figure 3a (in use)

### Fojo 2021 (Ann Intern Med)
- [x] `fojo-2021-end-hiv-fig4.png` - Figure 4 (in use)
