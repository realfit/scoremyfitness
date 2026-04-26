/* =====================================================================
   NFL Combine bands data
   --------------------
   Per-event, per-position bands derived from NFL.com per-position
   averages since 2003, ESPN's all-time records, A to Z Sports' since-2000
   per-position aggregations, and Pro Football Network's records list.

   Each band defines a range in the test's canonical unit. For lower-is-
   better tests, lower values are better. For higher-is-better tests,
   higher values are better. Bands are non-overlapping and contiguous.

   Band ladder (consistent across all events):
   - "Historic"             ~ all-time records / sub-record territory
   - "Elite"                ~ top 5% of position prospects
   - "First-round caliber"  ~ top 25% of position prospects
   - "NFL starter"          ~ position average ± slight band
   - "Below positional"     ~ slower/weaker than NFL starter baseline

   Used by:
     - /combine
     - /40-yard-dash
     - /vertical-jump
     - /broad-jump
     - /3-cone
     - /shuttle
     - /bench-225

   Sources:
     - NFL.com (2003–present per-position 40-yard distributions)
     - ESPN (all-time combine records since 2006)
     - A to Z Sports (per-position averages since 2000, all events)
     - Pro Football Network (records and benchmarks)
     - Wikipedia (NFL Scouting Combine; 40-yard dash)

   Bands are not Army or NFL-published; they are interpretive bands
   constructed from published distributional data. See attribution in
   the "Built on FITDAT" footer.
   ===================================================================== */

window.NFL_COMBINE_BANDS = {
  meta: {
    version: "1.0.0",
    publishedBy: "REALFIT",
    publishedDate: "2026-04-26",
    sourceAttribution: [
      "NFL.com per-position 40-yard dash distributions (2003–present)",
      "ESPN all-time combine records (2006–present)",
      "A to Z Sports per-position averages since 2000",
      "Pro Football Network records and benchmarks"
    ]
  },

  positions: [
    { id: "qb",    name: "Quarterback",       short: "QB"   },
    { id: "rb",    name: "Running Back",      short: "RB"   },
    { id: "wr",    name: "Wide Receiver",     short: "WR"   },
    { id: "te",    name: "Tight End",         short: "TE"   },
    { id: "ol",    name: "Offensive Line",    short: "OL"   },
    { id: "dl",    name: "Defensive Line",    short: "DL"   },
    { id: "edge",  name: "EDGE / Pass Rusher",short: "EDGE" },
    { id: "lb",    name: "Linebacker",        short: "LB"   },
    { id: "cb",    name: "Cornerback",        short: "CB"   },
    { id: "s",     name: "Safety",            short: "S"    }
  ],

  events: [
    {
      id: "fortyYard",
      name: "40-Yard Dash",
      unit: "seconds",
      direction: "lower",
      precision: 2,
      placeholder: "4.55",
      inputMin: 4.0,
      inputMax: 7.0,
      record: { value: 4.21, holder: "Xavier Worthy", year: 2024, position: "WR" }
    },
    {
      id: "verticalJump",
      name: "Vertical Jump",
      unit: "inches",
      direction: "higher",
      precision: 1,
      placeholder: "35.5",
      inputMin: 15,
      inputMax: 50,
      record: { value: 46.0, holder: "Chris Conley / Donald Washington", year: 2015, position: "WR / CB" }
    },
    {
      id: "broadJump",
      name: "Broad Jump",
      unit: "inches",
      direction: "higher",
      precision: 0,
      placeholder: "120",
      inputMin: 70,
      inputMax: 160,
      record: { value: 147, holder: "Byron Jones", year: 2015, position: "CB" }
    },
    {
      id: "bench225",
      name: "Bench Press (225 lb reps)",
      unit: "reps",
      direction: "higher",
      precision: 0,
      placeholder: "20",
      inputMin: 0,
      inputMax: 60,
      record: { value: 49, holder: "Stephen Paea", year: 2011, position: "DT" }
    },
    {
      id: "threeCone",
      name: "3-Cone Drill",
      unit: "seconds",
      direction: "lower",
      precision: 2,
      placeholder: "7.05",
      inputMin: 6.0,
      inputMax: 9.0,
      record: { value: 6.28, holder: "Jordan Thomas", year: 2018, position: "CB" }
    },
    {
      id: "shuttle",
      name: "20-Yard Shuttle",
      unit: "seconds",
      direction: "lower",
      precision: 2,
      placeholder: "4.25",
      inputMin: 3.5,
      inputMax: 6.0,
      record: { value: 3.81, holder: "Brandin Cooks / Jason Allen", year: 2014, position: "WR / CB" }
    }
  ],

  /* Band format:
     For lower-is-better:  { max: <upper bound inclusive>, label: "...", feedback: "..." }
       Bands ordered best→worst. The first band has no min (it's "≤ max"),
       the last has no max (it's "> previous max").
     For higher-is-better: { min: <lower bound inclusive>, label: "...", feedback: "..." }
       Bands ordered best→worst. The first band has no max (it's "≥ min"),
       the last has no min (it's "< previous min").

     Feedback strings are short and position-specific. */

  bands: {
    fortyYard: {
      qb: [
        { max: 4.40, label: "Historic", feedback: "Faster than any QB in combine history." },
        { max: 4.55, label: "Elite", feedback: "Top-tier QB mobility — top 5% of QB prospects." },
        { max: 4.65, label: "First-round caliber", feedback: "Above-average QB athleticism." },
        { max: 4.85, label: "NFL starter", feedback: "Within QB starter range (avg ~4.59)." },
        { max: null, label: "Below positional", feedback: "Slower than typical QB starter baseline." }
      ],
      rb: [
        { max: 4.30, label: "Historic", feedback: "Among the fastest RB times ever recorded." },
        { max: 4.40, label: "Elite", feedback: "Top-tier RB speed — top 5% of RB prospects." },
        { max: 4.49, label: "First-round caliber", feedback: "Notably fast for an RB — first-round speed." },
        { max: 4.65, label: "NFL starter", feedback: "Within RB starter range (avg ~4.55)." },
        { max: null, label: "Below positional", feedback: "Slower than typical RB starter baseline." }
      ],
      wr: [
        { max: 4.30, label: "Historic", feedback: "Sub-4.30 WR speed — historic territory." },
        { max: 4.40, label: "Elite", feedback: "Top 11% of WR prospects since 2003." },
        { max: 4.49, label: "First-round caliber", feedback: "Above WR average — first-round speed." },
        { max: 4.59, label: "NFL starter", feedback: "Within WR starter range (avg ~4.52)." },
        { max: null, label: "Below positional", feedback: "Slower than typical WR starter baseline." }
      ],
      te: [
        { max: 4.50, label: "Historic", feedback: "Among the fastest TE times ever — sub-4.50 is rare." },
        { max: 4.65, label: "Elite", feedback: "Top-tier TE speed — receiving-threat level." },
        { max: 4.75, label: "First-round caliber", feedback: "Above-average TE athleticism." },
        { max: 4.85, label: "NFL starter", feedback: "Within TE starter range (avg ~4.73)." },
        { max: null, label: "Below positional", feedback: "Below typical TE athletic baseline." }
      ],
      ol: [
        { max: 4.85, label: "Historic", feedback: "Sub-4.85 for an OL is exceptional — among the fastest ever." },
        { max: 5.00, label: "Elite", feedback: "Top-tier OL athleticism — pulling-guard speed." },
        { max: 5.10, label: "First-round caliber", feedback: "Above-average OL athleticism." },
        { max: 5.30, label: "NFL starter", feedback: "Within OL starter range (avg ~5.20)." },
        { max: null, label: "Below positional", feedback: "Below typical OL athletic baseline." }
      ],
      dl: [
        { max: 4.75, label: "Historic", feedback: "Sub-4.75 for an interior DL is exceptional." },
        { max: 4.90, label: "Elite", feedback: "Top-tier DT speed." },
        { max: 5.00, label: "First-round caliber", feedback: "Above-average DL athleticism." },
        { max: 5.15, label: "NFL starter", feedback: "Within DL starter range (avg ~5.05)." },
        { max: null, label: "Below positional", feedback: "Below typical DL athletic baseline." }
      ],
      edge: [
        { max: 4.45, label: "Historic", feedback: "Sub-4.45 EDGE speed — historic for a pass rusher." },
        { max: 4.65, label: "Elite", feedback: "Top-tier EDGE explosiveness off the line." },
        { max: 4.75, label: "First-round caliber", feedback: "Above-average EDGE first-step speed." },
        { max: 4.85, label: "NFL starter", feedback: "Within EDGE starter range (avg ~4.75)." },
        { max: null, label: "Below positional", feedback: "Below typical EDGE athletic baseline." }
      ],
      lb: [
        { max: 4.40, label: "Historic", feedback: "Sub-4.40 LB speed — historic territory." },
        { max: 4.55, label: "Elite", feedback: "Top-tier LB speed — sideline-to-sideline range." },
        { max: 4.65, label: "First-round caliber", feedback: "Above-average LB athleticism." },
        { max: 4.75, label: "NFL starter", feedback: "Within LB starter range (avg ~4.65)." },
        { max: null, label: "Below positional", feedback: "Slower than typical LB starter baseline." }
      ],
      cb: [
        { max: 4.30, label: "Historic", feedback: "Sub-4.30 CB speed — historic territory." },
        { max: 4.40, label: "Elite", feedback: "Top-tier CB speed — burner-cornerback range." },
        { max: 4.45, label: "First-round caliber", feedback: "Notable CB speed — first-round burner level." },
        { max: 4.55, label: "NFL starter", feedback: "Within CB starter range (avg ~4.45)." },
        { max: null, label: "Below positional", feedback: "Slower than typical CB starter baseline." }
      ],
      s: [
        { max: 4.30, label: "Historic", feedback: "Sub-4.30 S speed — historic territory." },
        { max: 4.45, label: "Elite", feedback: "Top-tier S speed — coverage-safety range." },
        { max: 4.55, label: "First-round caliber", feedback: "Above-average S athleticism." },
        { max: 4.65, label: "NFL starter", feedback: "Within S starter range (avg ~4.55)." },
        { max: null, label: "Below positional", feedback: "Slower than typical S starter baseline." }
      ]
    },

    verticalJump: {
      qb: [
        { min: 38, label: "Historic", feedback: "Exceptional explosiveness for a QB." },
        { min: 34, label: "Elite", feedback: "Top-tier QB explosiveness." },
        { min: 32, label: "First-round caliber", feedback: "Above-average QB athleticism." },
        { min: 28, label: "NFL starter", feedback: "Within QB starter range (avg ~31)." },
        { min: null, label: "Below positional", feedback: "Below typical QB athletic baseline." }
      ],
      rb: [
        { min: 42, label: "Historic", feedback: "Among the highest RB verticals ever." },
        { min: 38, label: "Elite", feedback: "Top-tier RB explosiveness." },
        { min: 36, label: "First-round caliber", feedback: "Above-average RB explosion." },
        { min: 32, label: "NFL starter", feedback: "Within RB starter range (avg ~35)." },
        { min: null, label: "Below positional", feedback: "Below typical RB explosion baseline." }
      ],
      wr: [
        { min: 42, label: "Historic", feedback: "Top-tier WR explosiveness — high-point catch territory." },
        { min: 39, label: "Elite", feedback: "Top 5% of WR prospects." },
        { min: 36, label: "First-round caliber", feedback: "Above-average WR explosion." },
        { min: 33, label: "NFL starter", feedback: "Within WR starter range (avg ~36)." },
        { min: null, label: "Below positional", feedback: "Below typical WR explosion baseline." }
      ],
      te: [
        { min: 38, label: "Historic", feedback: "Exceptional TE explosiveness — receiving-threat level." },
        { min: 36, label: "Elite", feedback: "Top-tier TE explosion." },
        { min: 34, label: "First-round caliber", feedback: "Above-average TE explosion." },
        { min: 31, label: "NFL starter", feedback: "Within TE starter range (avg ~33)." },
        { min: null, label: "Below positional", feedback: "Below typical TE explosion baseline." }
      ],
      ol: [
        { min: 34, label: "Historic", feedback: "Exceptional OL explosiveness — rare for the position." },
        { min: 32, label: "Elite", feedback: "Top-tier OL explosion." },
        { min: 30, label: "First-round caliber", feedback: "Above-average OL athleticism." },
        { min: 26, label: "NFL starter", feedback: "Within OL starter range (avg ~28)." },
        { min: null, label: "Below positional", feedback: "Below typical OL explosion baseline." }
      ],
      dl: [
        { min: 36, label: "Historic", feedback: "Exceptional DT explosiveness." },
        { min: 33, label: "Elite", feedback: "Top-tier DT explosion." },
        { min: 31, label: "First-round caliber", feedback: "Above-average DL athleticism." },
        { min: 28, label: "NFL starter", feedback: "Within DL starter range (avg ~31)." },
        { min: null, label: "Below positional", feedback: "Below typical DL explosion baseline." }
      ],
      edge: [
        { min: 39, label: "Historic", feedback: "Exceptional EDGE explosiveness." },
        { min: 36, label: "Elite", feedback: "Top-tier EDGE explosion." },
        { min: 34, label: "First-round caliber", feedback: "Above-average EDGE first-step explosion." },
        { min: 31, label: "NFL starter", feedback: "Within EDGE starter range (avg ~33)." },
        { min: null, label: "Below positional", feedback: "Below typical EDGE explosion baseline." }
      ],
      lb: [
        { min: 40, label: "Historic", feedback: "Exceptional LB explosiveness." },
        { min: 37, label: "Elite", feedback: "Top-tier LB explosion." },
        { min: 35, label: "First-round caliber", feedback: "Above-average LB explosion." },
        { min: 32, label: "NFL starter", feedback: "Within LB starter range (avg ~35)." },
        { min: null, label: "Below positional", feedback: "Below typical LB explosion baseline." }
      ],
      cb: [
        { min: 41, label: "Historic", feedback: "Top-tier CB explosiveness — rare combine vertical." },
        { min: 38, label: "Elite", feedback: "Elite CB explosion." },
        { min: 36, label: "First-round caliber", feedback: "Above-average CB explosion." },
        { min: 33, label: "NFL starter", feedback: "Within CB starter range (avg ~36)." },
        { min: null, label: "Below positional", feedback: "Below typical CB explosion baseline." }
      ],
      s: [
        { min: 42, label: "Historic", feedback: "Top-tier S explosiveness." },
        { min: 39, label: "Elite", feedback: "Elite S explosion." },
        { min: 37, label: "First-round caliber", feedback: "Above-average S explosion." },
        { min: 34, label: "NFL starter", feedback: "Within S starter range (avg ~37)." },
        { min: null, label: "Below positional", feedback: "Below typical S explosion baseline." }
      ]
    },

    broadJump: {
      qb: [
        { min: 125, label: "Historic", feedback: "Exceptional explosiveness for a QB." },
        { min: 118, label: "Elite", feedback: "Top-tier QB explosion." },
        { min: 113, label: "First-round caliber", feedback: "Above-average QB athleticism." },
        { min: 105, label: "NFL starter", feedback: "Within QB starter range (avg ~110)." },
        { min: null, label: "Below positional", feedback: "Below typical QB explosion baseline." }
      ],
      rb: [
        { min: 130, label: "Historic", feedback: "Top-tier RB explosion." },
        { min: 124, label: "Elite", feedback: "Elite RB explosion." },
        { min: 120, label: "First-round caliber", feedback: "Above-average RB explosion." },
        { min: 113, label: "NFL starter", feedback: "Within RB starter range (avg ~118)." },
        { min: null, label: "Below positional", feedback: "Below typical RB explosion baseline." }
      ],
      wr: [
        { min: 132, label: "Historic", feedback: "Top-tier WR explosion." },
        { min: 126, label: "Elite", feedback: "Top 5% of WR prospects." },
        { min: 122, label: "First-round caliber", feedback: "Above-average WR explosion." },
        { min: 116, label: "NFL starter", feedback: "Within WR starter range (avg ~120)." },
        { min: null, label: "Below positional", feedback: "Below typical WR explosion baseline." }
      ],
      te: [
        { min: 124, label: "Historic", feedback: "Top-tier TE explosiveness." },
        { min: 119, label: "Elite", feedback: "Elite TE explosion." },
        { min: 116, label: "First-round caliber", feedback: "Above-average TE explosion." },
        { min: 109, label: "NFL starter", feedback: "Within TE starter range (avg ~113)." },
        { min: null, label: "Below positional", feedback: "Below typical TE explosion baseline." }
      ],
      ol: [
        { min: 115, label: "Historic", feedback: "Exceptional OL explosiveness — rare for the position." },
        { min: 109, label: "Elite", feedback: "Top-tier OL explosion." },
        { min: 106, label: "First-round caliber", feedback: "Above-average OL athleticism." },
        { min: 98,  label: "NFL starter", feedback: "Within OL starter range (avg ~102)." },
        { min: null, label: "Below positional", feedback: "Below typical OL explosion baseline." }
      ],
      dl: [
        { min: 120, label: "Historic", feedback: "Exceptional DT explosiveness." },
        { min: 112, label: "Elite", feedback: "Top-tier DL explosion." },
        { min: 108, label: "First-round caliber", feedback: "Above-average DL athleticism." },
        { min: 100, label: "NFL starter", feedback: "Within DL starter range (avg ~104)." },
        { min: null, label: "Below positional", feedback: "Below typical DL explosion baseline." }
      ],
      edge: [
        { min: 124, label: "Historic", feedback: "Top-tier EDGE explosiveness." },
        { min: 117, label: "Elite", feedback: "Elite EDGE explosion." },
        { min: 113, label: "First-round caliber", feedback: "Above-average EDGE explosion." },
        { min: 107, label: "NFL starter", feedback: "Within EDGE starter range (avg ~111)." },
        { min: null, label: "Below positional", feedback: "Below typical EDGE explosion baseline." }
      ],
      lb: [
        { min: 128, label: "Historic", feedback: "Top-tier LB explosiveness." },
        { min: 121, label: "Elite", feedback: "Elite LB explosion." },
        { min: 117, label: "First-round caliber", feedback: "Above-average LB explosion." },
        { min: 111, label: "NFL starter", feedback: "Within LB starter range (avg ~115)." },
        { min: null, label: "Below positional", feedback: "Below typical LB explosion baseline." }
      ],
      cb: [
        { min: 132, label: "Historic", feedback: "Top-tier CB explosion — Byron Jones territory." },
        { min: 126, label: "Elite", feedback: "Elite CB explosion." },
        { min: 123, label: "First-round caliber", feedback: "Above-average CB explosion." },
        { min: 117, label: "NFL starter", feedback: "Within CB starter range (avg ~121)." },
        { min: null, label: "Below positional", feedback: "Below typical CB explosion baseline." }
      ],
      s: [
        { min: 130, label: "Historic", feedback: "Top-tier S explosiveness." },
        { min: 124, label: "Elite", feedback: "Elite S explosion." },
        { min: 121, label: "First-round caliber", feedback: "Above-average S explosion." },
        { min: 115, label: "NFL starter", feedback: "Within S starter range (avg ~119)." },
        { min: null, label: "Below positional", feedback: "Below typical S explosion baseline." }
      ]
    },

    bench225: {
      qb: [
        { min: 18, label: "Historic", feedback: "Exceptional QB upper-body strength." },
        { min: 12, label: "Elite", feedback: "Top-tier QB strength." },
        { min: 9,  label: "First-round caliber", feedback: "Above-average QB strength." },
        { min: 4,  label: "NFL starter", feedback: "Within QB starter range (avg ~6)." },
        { min: null, label: "Below positional", feedback: "Below typical QB strength baseline." }
      ],
      rb: [
        { min: 28, label: "Historic", feedback: "Top-tier RB upper-body strength." },
        { min: 23, label: "Elite", feedback: "Elite RB strength." },
        { min: 20, label: "First-round caliber", feedback: "Above-average RB strength." },
        { min: 16, label: "NFL starter", feedback: "Within RB starter range (avg ~18)." },
        { min: null, label: "Below positional", feedback: "Below typical RB strength baseline." }
      ],
      wr: [
        { min: 22, label: "Historic", feedback: "Exceptional WR upper-body strength — rare." },
        { min: 17, label: "Elite", feedback: "Top-tier WR strength." },
        { min: 14, label: "First-round caliber", feedback: "Above-average WR strength." },
        { min: 9,  label: "NFL starter", feedback: "Within WR starter range (avg ~11)." },
        { min: null, label: "Below positional", feedback: "Below typical WR strength baseline." }
      ],
      te: [
        { min: 28, label: "Historic", feedback: "Top-tier TE upper-body strength." },
        { min: 24, label: "Elite", feedback: "Elite TE strength." },
        { min: 21, label: "First-round caliber", feedback: "Above-average TE strength." },
        { min: 17, label: "NFL starter", feedback: "Within TE starter range (avg ~19)." },
        { min: null, label: "Below positional", feedback: "Below typical TE strength baseline." }
      ],
      ol: [
        { min: 35, label: "Historic", feedback: "Top-tier OL upper-body strength." },
        { min: 28, label: "Elite", feedback: "Elite OL strength." },
        { min: 24, label: "First-round caliber", feedback: "Above-average OL strength." },
        { min: 18, label: "NFL starter", feedback: "Within OL starter range (avg ~21)." },
        { min: null, label: "Below positional", feedback: "Below typical OL strength baseline." }
      ],
      dl: [
        { min: 40, label: "Historic", feedback: "Exceptional DT strength — Stephen Paea territory." },
        { min: 33, label: "Elite", feedback: "Elite DT strength." },
        { min: 29, label: "First-round caliber", feedback: "Above-average DL strength." },
        { min: 22, label: "NFL starter", feedback: "Within DL starter range (avg ~26)." },
        { min: null, label: "Below positional", feedback: "Below typical DL strength baseline." }
      ],
      edge: [
        { min: 32, label: "Historic", feedback: "Top-tier EDGE upper-body strength." },
        { min: 27, label: "Elite", feedback: "Elite EDGE strength." },
        { min: 24, label: "First-round caliber", feedback: "Above-average EDGE strength." },
        { min: 19, label: "NFL starter", feedback: "Within EDGE starter range (avg ~22)." },
        { min: null, label: "Below positional", feedback: "Below typical EDGE strength baseline." }
      ],
      lb: [
        { min: 30, label: "Historic", feedback: "Top-tier LB upper-body strength." },
        { min: 25, label: "Elite", feedback: "Elite LB strength." },
        { min: 22, label: "First-round caliber", feedback: "Above-average LB strength." },
        { min: 17, label: "NFL starter", feedback: "Within LB starter range (avg ~20)." },
        { min: null, label: "Below positional", feedback: "Below typical LB strength baseline." }
      ],
      cb: [
        { min: 22, label: "Historic", feedback: "Exceptional CB upper-body strength — rare." },
        { min: 18, label: "Elite", feedback: "Top-tier CB strength." },
        { min: 16, label: "First-round caliber", feedback: "Above-average CB strength." },
        { min: 11, label: "NFL starter", feedback: "Within CB starter range (avg ~13)." },
        { min: null, label: "Below positional", feedback: "Below typical CB strength baseline." }
      ],
      s: [
        { min: 24, label: "Historic", feedback: "Top-tier S upper-body strength." },
        { min: 19, label: "Elite", feedback: "Elite S strength." },
        { min: 17, label: "First-round caliber", feedback: "Above-average S strength." },
        { min: 12, label: "NFL starter", feedback: "Within S starter range (avg ~14)." },
        { min: null, label: "Below positional", feedback: "Below typical S strength baseline." }
      ]
    },

    threeCone: {
      qb: [
        { max: 6.85, label: "Historic", feedback: "Exceptional QB change-of-direction." },
        { max: 7.00, label: "Elite", feedback: "Top-tier QB agility." },
        { max: 7.05, label: "First-round caliber", feedback: "Above-average QB agility." },
        { max: 7.20, label: "NFL starter", feedback: "Within QB starter range (avg ~7.10)." },
        { max: null, label: "Below positional", feedback: "Below typical QB agility baseline." }
      ],
      rb: [
        { max: 6.75, label: "Historic", feedback: "Top-tier RB agility." },
        { max: 6.95, label: "Elite", feedback: "Elite RB agility." },
        { max: 7.00, label: "First-round caliber", feedback: "Above-average RB agility." },
        { max: 7.15, label: "NFL starter", feedback: "Within RB starter range (avg ~7.05)." },
        { max: null, label: "Below positional", feedback: "Below typical RB agility baseline." }
      ],
      wr: [
        { max: 6.50, label: "Historic", feedback: "Sub-6.50 — historic WR agility." },
        { max: 6.80, label: "Elite", feedback: "Top-tier WR agility — slot-receiver caliber." },
        { max: 6.90, label: "First-round caliber", feedback: "Above-average WR agility." },
        { max: 7.05, label: "NFL starter", feedback: "Within WR starter range (avg ~6.95)." },
        { max: null, label: "Below positional", feedback: "Below typical WR agility baseline." }
      ],
      te: [
        { max: 6.85, label: "Historic", feedback: "Exceptional TE agility — receiving-threat level." },
        { max: 7.00, label: "Elite", feedback: "Elite TE agility." },
        { max: 7.05, label: "First-round caliber", feedback: "Above-average TE agility." },
        { max: 7.20, label: "NFL starter", feedback: "Within TE starter range (avg ~7.10)." },
        { max: null, label: "Below positional", feedback: "Below typical TE agility baseline." }
      ],
      ol: [
        { max: 7.30, label: "Historic", feedback: "Exceptional OL agility — rare for the position." },
        { max: 7.55, label: "Elite", feedback: "Top-tier OL agility — pulling-guard level." },
        { max: 7.65, label: "First-round caliber", feedback: "Above-average OL athleticism." },
        { max: 7.85, label: "NFL starter", feedback: "Within OL starter range (avg ~7.75)." },
        { max: null, label: "Below positional", feedback: "Below typical OL agility baseline." }
      ],
      dl: [
        { max: 7.20, label: "Historic", feedback: "Exceptional DL agility." },
        { max: 7.45, label: "Elite", feedback: "Top-tier DL agility." },
        { max: 7.55, label: "First-round caliber", feedback: "Above-average DL athleticism." },
        { max: 7.75, label: "NFL starter", feedback: "Within DL starter range (avg ~7.65)." },
        { max: null, label: "Below positional", feedback: "Below typical DL agility baseline." }
      ],
      edge: [
        { max: 6.85, label: "Historic", feedback: "Top-tier EDGE agility — pass-rush bend." },
        { max: 7.05, label: "Elite", feedback: "Elite EDGE agility." },
        { max: 7.15, label: "First-round caliber", feedback: "Above-average EDGE agility." },
        { max: 7.30, label: "NFL starter", feedback: "Within EDGE starter range (avg ~7.20)." },
        { max: null, label: "Below positional", feedback: "Below typical EDGE agility baseline." }
      ],
      lb: [
        { max: 6.85, label: "Historic", feedback: "Exceptional LB agility — rare territory." },
        { max: 7.00, label: "Elite", feedback: "Top-tier LB agility." },
        { max: 7.05, label: "First-round caliber", feedback: "Above-average LB agility." },
        { max: 7.20, label: "NFL starter", feedback: "Within LB starter range (avg ~7.10)." },
        { max: null, label: "Below positional", feedback: "Below typical LB agility baseline." }
      ],
      cb: [
        { max: 6.50, label: "Historic", feedback: "Sub-6.50 CB agility — Jordan Thomas territory." },
        { max: 6.80, label: "Elite", feedback: "Top-tier CB agility." },
        { max: 6.90, label: "First-round caliber", feedback: "Above-average CB agility." },
        { max: 7.05, label: "NFL starter", feedback: "Within CB starter range (avg ~6.95)." },
        { max: null, label: "Below positional", feedback: "Below typical CB agility baseline." }
      ],
      s: [
        { max: 6.55, label: "Historic", feedback: "Exceptional S agility." },
        { max: 6.80, label: "Elite", feedback: "Top-tier S agility." },
        { max: 6.90, label: "First-round caliber", feedback: "Above-average S agility." },
        { max: 7.05, label: "NFL starter", feedback: "Within S starter range (avg ~6.95)." },
        { max: null, label: "Below positional", feedback: "Below typical S agility baseline." }
      ]
    },

    shuttle: {
      qb: [
        { max: 4.05, label: "Historic", feedback: "Exceptional QB lateral quickness." },
        { max: 4.25, label: "Elite", feedback: "Top-tier QB lateral agility." },
        { max: 4.35, label: "First-round caliber", feedback: "Above-average QB lateral quickness." },
        { max: 4.50, label: "NFL starter", feedback: "Within QB starter range (avg ~4.40)." },
        { max: null, label: "Below positional", feedback: "Below typical QB lateral baseline." }
      ],
      rb: [
        { max: 4.00, label: "Historic", feedback: "Top-tier RB lateral quickness." },
        { max: 4.15, label: "Elite", feedback: "Elite RB lateral agility." },
        { max: 4.20, label: "First-round caliber", feedback: "Above-average RB lateral agility." },
        { max: 4.35, label: "NFL starter", feedback: "Within RB starter range (avg ~4.25)." },
        { max: null, label: "Below positional", feedback: "Below typical RB lateral baseline." }
      ],
      wr: [
        { max: 3.95, label: "Historic", feedback: "Sub-3.95 — historic WR lateral quickness." },
        { max: 4.10, label: "Elite", feedback: "Top-tier WR lateral agility." },
        { max: 4.15, label: "First-round caliber", feedback: "Above-average WR lateral agility." },
        { max: 4.30, label: "NFL starter", feedback: "Within WR starter range (avg ~4.20)." },
        { max: null, label: "Below positional", feedback: "Below typical WR lateral baseline." }
      ],
      te: [
        { max: 4.15, label: "Historic", feedback: "Exceptional TE lateral quickness." },
        { max: 4.30, label: "Elite", feedback: "Elite TE lateral agility." },
        { max: 4.35, label: "First-round caliber", feedback: "Above-average TE lateral agility." },
        { max: 4.50, label: "NFL starter", feedback: "Within TE starter range (avg ~4.40)." },
        { max: null, label: "Below positional", feedback: "Below typical TE lateral baseline." }
      ],
      ol: [
        { max: 4.45, label: "Historic", feedback: "Exceptional OL lateral quickness — rare." },
        { max: 4.60, label: "Elite", feedback: "Top-tier OL lateral agility." },
        { max: 4.70, label: "First-round caliber", feedback: "Above-average OL athleticism." },
        { max: 4.85, label: "NFL starter", feedback: "Within OL starter range (avg ~4.75)." },
        { max: null, label: "Below positional", feedback: "Below typical OL lateral baseline." }
      ],
      dl: [
        { max: 4.40, label: "Historic", feedback: "Exceptional DL lateral quickness." },
        { max: 4.55, label: "Elite", feedback: "Top-tier DL lateral agility." },
        { max: 4.60, label: "First-round caliber", feedback: "Above-average DL athleticism." },
        { max: 4.75, label: "NFL starter", feedback: "Within DL starter range (avg ~4.65)." },
        { max: null, label: "Below positional", feedback: "Below typical DL lateral baseline." }
      ],
      edge: [
        { max: 4.20, label: "Historic", feedback: "Top-tier EDGE lateral quickness." },
        { max: 4.35, label: "Elite", feedback: "Elite EDGE lateral agility." },
        { max: 4.40, label: "First-round caliber", feedback: "Above-average EDGE lateral agility." },
        { max: 4.50, label: "NFL starter", feedback: "Within EDGE starter range (avg ~4.40)." },
        { max: null, label: "Below positional", feedback: "Below typical EDGE lateral baseline." }
      ],
      lb: [
        { max: 4.10, label: "Historic", feedback: "Exceptional LB lateral quickness." },
        { max: 4.25, label: "Elite", feedback: "Top-tier LB lateral agility." },
        { max: 4.30, label: "First-round caliber", feedback: "Above-average LB lateral agility." },
        { max: 4.40, label: "NFL starter", feedback: "Within LB starter range (avg ~4.30)." },
        { max: null, label: "Below positional", feedback: "Below typical LB lateral baseline." }
      ],
      cb: [
        { max: 3.90, label: "Historic", feedback: "Sub-3.90 CB lateral — historic territory." },
        { max: 4.10, label: "Elite", feedback: "Top-tier CB lateral agility." },
        { max: 4.15, label: "First-round caliber", feedback: "Above-average CB lateral agility." },
        { max: 4.30, label: "NFL starter", feedback: "Within CB starter range (avg ~4.20)." },
        { max: null, label: "Below positional", feedback: "Below typical CB lateral baseline." }
      ],
      s: [
        { max: 3.95, label: "Historic", feedback: "Exceptional S lateral quickness." },
        { max: 4.10, label: "Elite", feedback: "Top-tier S lateral agility." },
        { max: 4.15, label: "First-round caliber", feedback: "Above-average S lateral agility." },
        { max: 4.30, label: "NFL starter", feedback: "Within S starter range (avg ~4.20)." },
        { max: null, label: "Below positional", feedback: "Below typical S lateral baseline." }
      ]
    }
  }
};
