# Publication Figures

This directory contains key figures extracted from featured publications for display on the website.

## File Naming Convention

Use the publication ID as the filename:
- `althoff-2024.png`
- `hyle-2023.png`
- `althoff-2021.png`
- `fojo-2021-end-hiv.png`

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
  imageUrl: "/images/publications/althoff-2024.png",
  imageCaption: "Figure 2: Forecasted prevalence of comorbidities and multimorbidity in PWH using ART"
}
```

## Copyright Notice

These figures are extracted from publications authored by team members for display on the official research group website. Ensure proper attribution and respect copyright guidelines when using figures from published work.

## Current Figures

- [ ] `althoff-2024.png` - Figure 2 from PLoS Medicine 2024
- [ ] `hyle-2023.png` - Figure 2 from J Infect Dis 2023
- [ ] `althoff-2021.png` - Figure 3a from AIDS 2021
- [ ] `fojo-2021-end-hiv.png` - Figure 4 from Ann Intern Med 2021
