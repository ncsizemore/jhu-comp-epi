/** Frozen portal projections; provenance and annual source values are in public/data/ryan-white-trajectory.json. */
export default function TrajectoryFigure() {
  return (
    <figure
      className="futures-figure cohort-figure"
      aria-labelledby="futures-title"
    >
      <div className="futures-plate">
        <div className="futures-story">
          <p className="kicker">Selected comparison</p>
          <h3 id="futures-title">Projected HIV infections through 2030</h3>
          <p className="futures-reading">
            With continued services, projected infections remain relatively
            stable. Ending services could drive a sustained increase.
          </p>
          <div className="futures-impact">
            <p className="futures-finding">
              <span className="futures-impact-value">79,000</span> additional
              infections projected across these metros, 2025–2030, if services
              end permanently.
            </p>
          </div>
        </div>
        <div className="futures-plot">
          <div className="futures-plot-heading">
            <p>New HIV infections each year</p>
            <span>31 U.S. metropolitan areas combined</span>
          </div>
          <svg
            className="future-chart future-chart-desktop"
            viewBox="0 0 840 438"
            role="img"
            aria-labelledby="trajectory-title-future-chart-desktop trajectory-desc-future-chart-desktop"
          >
            <title id="trajectory-title-future-chart-desktop">
              Two projected paths across 31 U.S. metropolitan areas
            </title>
            <desc id="trajectory-desc-future-chart-desktop">
              Annual new HIV infections across the 31 portal U.S. metropolitan
              areas, 2020 to 2030. The combined mean projection is 25,900
              infections in 2030 with continued Ryan White services and 43,000
              if services end permanently. The shaded space between the curves
              shows the difference between scenarios. These are sums of annual
              model means, including the earlier years. Combined uncertainty is
              not shown.
            </desc>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="368.0"
              y2="368.0"
            />
            <text className="future-axis" x="38" y="372.0" textAnchor="end">
              0
            </text>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="299.6"
              y2="299.6"
            />
            <text className="future-axis" x="38" y="303.6" textAnchor="end">
              10k
            </text>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="231.2"
              y2="231.2"
            />
            <text className="future-axis" x="38" y="235.2" textAnchor="end">
              20k
            </text>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="162.8"
              y2="162.8"
            />
            <text className="future-axis" x="38" y="166.8" textAnchor="end">
              30k
            </text>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="94.39999999999998"
              y2="94.39999999999998"
            />
            <text
              className="future-axis"
              x="38"
              y="98.39999999999998"
              textAnchor="end"
            >
              40k
            </text>
            <line
              className="future-grid"
              x1="48"
              x2="634"
              y1="26.0"
              y2="26.0"
            />
            <text className="future-axis" x="38" y="30.0" textAnchor="end">
              50k
            </text>
            <path
              className="future-scenario-gap"
              d="M282.40,189.74 C301.93,182.90 321.47,182.96 341.00,169.22 C360.53,155.49 380.07,120.04 399.60,107.31 C419.13,94.58 438.67,96.50 458.20,92.86 C477.73,89.23 497.27,87.72 516.80,85.51 C536.33,83.30 555.87,81.55 575.40,79.59 C594.93,77.64 614.47,75.72 634.00,73.78 L634.00,190.52 C614.47,190.91 594.93,191.40 575.40,191.69 C555.87,191.99 536.33,192.23 516.80,192.26 C497.27,192.30 477.73,192.30 458.20,192.30 C438.67,192.30 419.13,192.09 399.60,191.88 C380.07,191.67 360.53,191.40 341.00,191.04 C321.47,190.68 301.93,190.17 282.40,189.74 Z"
            />
            <line
              className="future-divider"
              x1="341.0"
              x2="341.0"
              y1="26"
              y2="368"
            />
            <path
              className="future-line future-line-history"
              d="M48.00,188.26 C67.53,187.03 87.07,184.55 106.60,184.55 C126.13,184.55 145.67,184.55 165.20,184.80 C184.73,185.06 204.27,186.95 223.80,187.77 C243.33,188.59 262.87,189.08 282.40,189.74"
            />
            <path
              className="future-line future-line-care"
              d="M282.40,189.74 C301.93,190.17 321.47,190.68 341.00,191.04 C360.53,191.40 380.07,191.67 399.60,191.88 C419.13,192.09 438.67,192.30 458.20,192.30 C477.73,192.30 497.27,192.30 516.80,192.26 C536.33,192.23 555.87,191.99 575.40,191.69 C594.93,191.40 614.47,190.91 634.00,190.52"
            />
            <path
              className="future-line future-line-end"
              d="M282.40,189.74 C301.93,182.90 321.47,182.96 341.00,169.22 C360.53,155.49 380.07,120.04 399.60,107.31 C419.13,94.58 438.67,96.50 458.20,92.86 C477.73,89.23 497.27,87.72 516.80,85.51 C536.33,83.30 555.87,81.55 575.40,79.59 C594.93,77.64 614.47,75.72 634.00,73.78"
            />
            <text className="future-axis" x="48.0" y="393" textAnchor="middle">
              2020
            </text>
            <text className="future-axis" x="165.2" y="393" textAnchor="middle">
              2022
            </text>
            <text className="future-axis" x="282.4" y="393" textAnchor="middle">
              2024
            </text>
            <text
              className="future-axis"
              x="399.59999999999997"
              y="393"
              textAnchor="middle"
            >
              2026
            </text>
            <text className="future-axis" x="516.8" y="393" textAnchor="middle">
              2028
            </text>
            <text className="future-axis" x="634.0" y="393" textAnchor="middle">
              2030
            </text>
            <text className="future-annotation" x="349.0" y="34">
              Services end in 2025
            </text>
            <circle
              className="future-dot future-dot-end"
              cx="634"
              cy="73.77871533200005"
              r="4"
            />
            <line
              className="future-leader future-leader-end"
              x1="642"
              x2="660"
              y1="73.77871533200005"
              y2="73.77871533200005"
            />
            <text
              className="future-direct future-direct-end"
              x="670"
              y="65.77871533200005"
            >
              Services end
            </text>
            <text
              className="future-end-value future-direct-end"
              x="670"
              y="100.77871533200005"
            >
              43,000<tspan className="future-end-unit"> / year</tspan>
            </text>
            <circle
              className="future-dot future-dot-care"
              cx="634"
              cy="190.51697412800002"
              r="4"
            />
            <line
              className="future-leader future-leader-care"
              x1="642"
              x2="660"
              y1="190.51697412800002"
              y2="190.51697412800002"
            />
            <text
              className="future-direct future-direct-care"
              x="670"
              y="182.51697412800002"
            >
              Services continue
            </text>
            <text
              className="future-end-value future-direct-care"
              x="670"
              y="217.51697412800002"
            >
              25,900<tspan className="future-end-unit"> / year</tspan>
            </text>
          </svg>
          <svg
            className="future-chart future-chart-mobile"
            viewBox="0 0 330 370"
            role="img"
            aria-labelledby="trajectory-title-future-chart-mobile trajectory-desc-future-chart-mobile"
          >
            <title id="trajectory-title-future-chart-mobile">
              Two projected paths across 31 U.S. metropolitan areas
            </title>
            <desc id="trajectory-desc-future-chart-mobile">
              Annual new HIV infections across the 31 portal U.S. metropolitan
              areas, 2020 to 2030. The combined mean projection is 25,900
              infections in 2030 with continued Ryan White services and 43,000
              if services end permanently. The shaded space between the curves
              shows the difference between scenarios. These are sums of annual
              model means, including the earlier years. Combined uncertainty is
              not shown.
            </desc>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="324.0"
              y2="324.0"
            />
            <text className="future-axis" x="22" y="328.0" textAnchor="end">
              0
            </text>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="265.6"
              y2="265.6"
            />
            <text
              className="future-axis"
              x="22"
              y="269.6"
              textAnchor="end"
            ></text>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="207.2"
              y2="207.2"
            />
            <text className="future-axis" x="22" y="211.2" textAnchor="end">
              20k
            </text>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="148.8"
              y2="148.8"
            />
            <text
              className="future-axis"
              x="22"
              y="152.8"
              textAnchor="end"
            ></text>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="90.39999999999998"
              y2="90.39999999999998"
            />
            <text
              className="future-axis"
              x="22"
              y="94.39999999999998"
              textAnchor="end"
            >
              40k
            </text>
            <line
              className="future-grid"
              x1="32"
              x2="302"
              y1="32.0"
              y2="32.0"
            />
            <text className="future-axis" x="22" y="36.0" textAnchor="end">
              50k
            </text>
            <path
              className="future-scenario-gap"
              d="M140.00,171.80 C149.00,165.96 158.00,166.01 167.00,154.28 C176.00,142.56 185.00,112.29 194.00,101.42 C203.00,90.56 212.00,92.19 221.00,89.09 C230.00,85.99 239.00,84.70 248.00,82.81 C257.00,80.92 266.00,79.42 275.00,77.76 C284.00,76.09 293.00,74.45 302.00,72.79 L302.00,172.46 C293.00,172.80 284.00,173.22 275.00,173.47 C266.00,173.72 257.00,173.93 248.00,173.96 C239.00,173.98 230.00,173.98 221.00,173.98 C212.00,173.98 203.00,173.81 194.00,173.63 C185.00,173.45 176.00,173.22 167.00,172.91 C158.00,172.61 149.00,172.17 140.00,171.80 Z"
            />
            <line
              className="future-divider"
              x1="167.0"
              x2="167.0"
              y1="32"
              y2="324"
            />
            <path
              className="future-line future-line-history"
              d="M32.00,170.54 C41.00,169.48 50.00,167.37 59.00,167.37 C68.00,167.37 77.00,167.37 86.00,167.59 C95.00,167.80 104.00,169.42 113.00,170.12 C122.00,170.82 131.00,171.24 140.00,171.80"
            />
            <path
              className="future-line future-line-care"
              d="M140.00,171.80 C149.00,172.17 158.00,172.61 167.00,172.91 C176.00,173.22 185.00,173.45 194.00,173.63 C203.00,173.81 212.00,173.98 221.00,173.98 C230.00,173.98 239.00,173.98 248.00,173.96 C257.00,173.93 266.00,173.72 275.00,173.47 C284.00,173.22 293.00,172.80 302.00,172.46"
            />
            <path
              className="future-line future-line-end"
              d="M140.00,171.80 C149.00,165.96 158.00,166.01 167.00,154.28 C176.00,142.56 185.00,112.29 194.00,101.42 C203.00,90.56 212.00,92.19 221.00,89.09 C230.00,85.99 239.00,84.70 248.00,82.81 C257.00,80.92 266.00,79.42 275.00,77.76 C284.00,76.09 293.00,74.45 302.00,72.79"
            />
            <text className="future-axis" x="32.0" y="349" textAnchor="middle">
              2020
            </text>
            <text className="future-axis" x="167.0" y="349" textAnchor="middle">
              2025
            </text>
            <text className="future-axis" x="302.0" y="349" textAnchor="middle">
              2030
            </text>
            <text className="future-annotation" x="175.0" y="12">
              Services end in 2025
            </text>
            <circle
              className="future-dot future-dot-end"
              cx="302"
              cy="72.79352303200002"
              r="4"
            />
            <text
              className="future-direct future-direct-end"
              x="294"
              y="50.793523032000024"
              textAnchor="end"
            >
              Services end · 43,000
            </text>
            <circle
              className="future-dot future-dot-care"
              cx="302"
              cy="172.464784928"
              r="4"
            />
            <text
              className="future-direct future-direct-care"
              x="294"
              y="200.464784928"
              textAnchor="end"
            >
              Services continue · 25,900
            </text>
          </svg>
          <div className="futures-key">
            <span>
              <i className="scenario-gap-key" aria-hidden="true"></i>Shading:
              difference between scenarios
            </span>
            <span>Combined mean projections</span>
          </div>
        </div>
        <div className="study-reach">
          <p>From Seattle and Los Angeles to Chicago, Atlanta, and New York.</p>
          <details className="study-locations">
            <summary>
              View all 31 metropolitan areas <span aria-hidden="true">+</span>
            </summary>
            <div className="study-location-list">
              <p>Metropolitan areas included in this view</p>
              <ul>
                <li>Atlanta</li>
                <li>Austin</li>
                <li>Baltimore</li>
                <li>Baton Rouge</li>
                <li>Boston</li>
                <li>Charlotte</li>
                <li>Chicago</li>
                <li>Cleveland</li>
                <li>Columbus</li>
                <li>Dallas</li>
                <li>Detroit</li>
                <li>Houston</li>
                <li>Indianapolis</li>
                <li>Jacksonville</li>
                <li>Las Vegas</li>
                <li>Los Angeles</li>
                <li>Memphis</li>
                <li>Miami</li>
                <li>New Orleans</li>
                <li>New York</li>
                <li>Orlando</li>
                <li>Philadelphia</li>
                <li>Phoenix</li>
                <li>Riverside</li>
                <li>Sacramento</li>
                <li>San Antonio</li>
                <li>San Diego</li>
                <li>San Francisco</li>
                <li>Seattle</li>
                <li>Tampa</li>
                <li>Washington</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
      <figcaption>
        <div className="figure-source">
          <p>
            Source: <a href="https://jheem.org/ryan-white">JHEEM portal</a>,
            March 2026 release. Shading shows the difference between scenarios,
            not uncertainty. This portal aggregation differs from the published
            study’s estimate of 75,436 additional infections.
          </p>
          <details className="figure-methods">
            <summary>Source and calculation</summary>
            <p>
              We sum annual model means across 31 metropolitan areas. In the
              cessation scenario, services end permanently in July 2025. The
              additional infections are summed over 2025–2030; displayed values
              are rounded. A combined uncertainty interval is not shown.
            </p>
            <p>
              Both the paper and portal report means, and the paper’s results
              table names the same 31 metros. Their estimates differ within
              individual metros; the cause has not yet been established.
              {" "}<a href="/data/ryan-white-trajectory.json">Annual source data</a>
              {" · "}<a href="/data/ryan-white-publication-comparison.json">Comparison with the publication</a>.
            </p>
          </details>
        </div>
        <a className="text-link" href="https://doi.org/10.7326/ANNALS-25-01737">
          Related publication <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
