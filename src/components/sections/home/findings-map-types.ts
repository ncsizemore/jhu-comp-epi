export type FindingsGeography = 'city' | 'state';

export type FindingsMetricUnit = 'count' | 'percent';

export type FindingsCityRow = {
  id: string;
  name: string;
  short: string;
  coords: [number, number];
  value: number;
  pct: number;
};

export type FindingsStateRow = {
  id: string;
  fips: string;
  name: string;
  abbr: string;
  value: number;
};

export type FindingsAnalysis = {
  id: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  question: string;
  geography: FindingsGeography;
  metric: {
    label: string;
    unit: FindingsMetricUnit;
    description: string;
  };
  cityData?: FindingsCityRow[];
  stateData?: FindingsStateRow[];
  summary: {
    value: string;
    label: string;
    detail: string;
  };
  citation: string;
  journal: string;
  year: number;
  href: string;
  portalUrl: string;
};

export type FindingsMapProps = {
  analyses: FindingsAnalysis[];
};
