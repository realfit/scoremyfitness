/* =====================================================================
   Single-test scorer renderer
   ----------------------------
   Each individual test page sets window.SCORER_CONFIG = { eventId } before
   loading this script. The script renders the page contents into the
   #scorer-root element using the centralized NFL_COMBINE_BANDS data.
   ===================================================================== */

(function() {
  if (!window.SCORER_CONFIG || !window.SCORER_CONFIG.eventId) {
    console.error('SingleTestScorer: missing SCORER_CONFIG');
    return;
  }

  const cfg = window.SCORER_CONFIG;
  const eventId = cfg.eventId;
  const event = NFL_COMBINE_BANDS.events.find(e => e.id === eventId);
  if (!event) {
    console.error('SingleTestScorer: unknown event ' + eventId);
    return;
  }

  // ─── State ───
  let comparisonMode = 'general';   // 'general' | 'nfl-<positionId>'
  let currentValue = null;

  // ─── Helpers ───
  function findBand(positionId, value) {
    const bands = NFL_COMBINE_BANDS.bands[eventId][positionId];
    if (!bands) return null;
    if (event.direction === 'lower') {
      for (let i = 0; i < bands.length; i++) {
        const b = bands[i];
        if (b.max === null || value <= b.max) return { ...b, index: i, totalBands: bands.length };
      }
    } else {
      for (let i = 0; i < bands.length; i++) {
        const b = bands[i];
        if (b.min === null || value >= b.min) return { ...b, index: i, totalBands: bands.length };
      }
    }
    return null;
  }

  function gradientPosition(positionId, value) {
    const bands = NFL_COMBINE_BANDS.bands[eventId][positionId];
    if (!bands || bands.length < 2) return 0.5;
    if (event.direction === 'lower') {
      const bestEdge = bands[0].max;
      const worstEdge = bands[bands.length - 2].max;
      if (value <= bestEdge) return 1;
      if (value >= worstEdge) return 0;
      return (worstEdge - value) / (worstEdge - bestEdge);
    } else {
      const bestEdge = bands[0].min;
      const worstEdge = bands[bands.length - 2].min;
      if (value >= bestEdge) return 1;
      if (value <= worstEdge) return 0;
      return (value - worstEdge) / (bestEdge - worstEdge);
    }
  }

  function tierClass(label) {
    const t = label.toLowerCase();
    if (t.includes('historic')) return 'tier-historic';
    if (t.includes('elite')) return 'tier-elite';
    if (t.includes('first-round')) return 'tier-first-round';
    if (t.includes('starter')) return 'tier-starter';
    return 'tier-below';
  }

  // ─── General-population bands (only available for fortyYard for now) ───
  // Anchored to broad athletic-performance distributions, not NFL combine.
  // For tests where general bands are not available, only NFL position
  // comparisons are offered.
  const GENERAL_BANDS = {
    fortyYard: [
      { max: 4.40, label: "Elite", feedback: "Elite speed across any athletic context." },
      { max: 4.80, label: "Excellent", feedback: "Faster than the vast majority of trained adults." },
      { max: 5.20, label: "Above Average", feedback: "Notably faster than average — well-trained athlete range." },
      { max: 5.80, label: "Average", feedback: "Within typical recreationally-trained adult range." },
      { max: null, label: "Below Average", feedback: "Slower than typical recreationally-trained adult range." }
    ]
    // Other events: general bands deferred until we have defensible
    // population-level data anchored to broad samples.
  };

  function findGeneralBand(value) {
    const bands = GENERAL_BANDS[eventId];
    if (!bands) return null;
    if (event.direction === 'lower') {
      for (let i = 0; i < bands.length; i++) {
        const b = bands[i];
        if (b.max === null || value <= b.max) return { ...b, index: i, totalBands: bands.length };
      }
    } else {
      for (let i = 0; i < bands.length; i++) {
        const b = bands[i];
        if (b.min === null || value >= b.min) return { ...b, index: i, totalBands: bands.length };
      }
    }
    return null;
  }

  function generalGradientPosition(value) {
    const bands = GENERAL_BANDS[eventId];
    if (!bands || bands.length < 2) return 0.5;
    if (event.direction === 'lower') {
      const bestEdge = bands[0].max;
      const worstEdge = bands[bands.length - 2].max;
      if (value <= bestEdge) return 1;
      if (value >= worstEdge) return 0;
      return (worstEdge - value) / (worstEdge - bestEdge);
    } else {
      const bestEdge = bands[0].min;
      const worstEdge = bands[bands.length - 2].min;
      if (value >= bestEdge) return 1;
      if (value <= worstEdge) return 0;
      return (value - worstEdge) / (bestEdge - worstEdge);
    }
  }

  // ─── Render comparison picker ───
  function renderPicker() {
    const container = document.getElementById('comparison-picker');
    if (!container) return;
    container.innerHTML = '';

    const generalAvail = !!GENERAL_BANDS[eventId];

    // General option (if available for this event)
    if (generalAvail) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'comparison-pill' + (comparisonMode === 'general' ? ' active' : '');
      pill.textContent = 'General';
      pill.title = 'General athletic performance';
      pill.addEventListener('click', () => { comparisonMode = 'general'; render(); });
      container.appendChild(pill);
    } else {
      // First load: default to first NFL position if no general
      if (comparisonMode === 'general') {
        comparisonMode = 'nfl-' + NFL_COMBINE_BANDS.positions[0].id;
      }
    }

    // NFL position options
    NFL_COMBINE_BANDS.positions.forEach(pos => {
      const mode = 'nfl-' + pos.id;
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'comparison-pill' + (comparisonMode === mode ? ' active' : '');
      pill.textContent = pos.short;
      pill.title = 'NFL Combine — ' + pos.name;
      pill.addEventListener('click', () => { comparisonMode = mode; render(); });
      container.appendChild(pill);
    });
  }

  // ─── Render result ───
  function renderResult() {
    const card = document.getElementById('result-card');
    if (!card) return;
    if (currentValue === null || isNaN(currentValue)) {
      card.classList.remove('has-value');
      return;
    }
    card.classList.add('has-value');

    let band, gradPos, anchorLeft, anchorRight, contextLabel;

    if (comparisonMode === 'general') {
      band = findGeneralBand(currentValue);
      gradPos = generalGradientPosition(currentValue);
      const bands = GENERAL_BANDS[eventId];
      if (event.direction === 'lower') {
        anchorLeft = '> ' + bands[bands.length - 2].max + ' ' + event.unit;
        anchorRight = '≤ ' + bands[0].max + ' ' + event.unit;
      } else {
        anchorLeft = '< ' + bands[bands.length - 2].min + ' ' + event.unit;
        anchorRight = '≥ ' + bands[0].min + ' ' + event.unit;
      }
      contextLabel = '';  // No "for a WR" suffix in general mode
    } else {
      const positionId = comparisonMode.replace('nfl-', '');
      const pos = NFL_COMBINE_BANDS.positions.find(p => p.id === positionId);
      band = findBand(positionId, currentValue);
      gradPos = gradientPosition(positionId, currentValue);
      const bands = NFL_COMBINE_BANDS.bands[eventId][positionId];
      if (event.direction === 'lower') {
        anchorLeft = '> ' + bands[bands.length - 2].max + ' ' + event.unit;
        anchorRight = '≤ ' + bands[0].max + ' ' + event.unit;
      } else {
        anchorLeft = '< ' + bands[bands.length - 2].min + ' ' + event.unit;
        anchorRight = '≥ ' + bands[0].min + ' ' + event.unit;
      }
      contextLabel = ' for ' + (pos.short.match(/^[AEIOU]/i) ? 'an ' : 'a ') + pos.short;
    }

    if (!band) {
      card.classList.remove('has-value');
      return;
    }

    const labelEl    = card.querySelector('[data-result-label]');
    const feedbackEl = card.querySelector('[data-result-feedback]');
    const markerEl   = card.querySelector('[data-marker]');
    const anchorL    = card.querySelector('[data-anchor-left]');
    const anchorR    = card.querySelector('[data-anchor-right]');

    labelEl.className = 'result-label ' + tierClass(band.label);
    labelEl.textContent = band.label + contextLabel;
    feedbackEl.textContent = band.feedback;

    const pct = Math.max(0, Math.min(1, gradPos)) * 100;
    markerEl.style.left = pct + '%';

    anchorL.textContent = anchorLeft;
    anchorR.textContent = anchorRight;
  }

  function render() {
    renderPicker();
    renderResult();
  }

  // ─── Bootstrap page chrome ───
  function bootstrap() {
    const root = document.getElementById('scorer-root');
    if (!root) {
      console.error('SingleTestScorer: #scorer-root not found');
      return;
    }
    if (typeof NFL_COMBINE_BANDS === 'undefined' || !NFL_COMBINE_BANDS) {
      console.error('SingleTestScorer: NFL_COMBINE_BANDS data not loaded');
      root.innerHTML = '<div style="color:#d85a30;font-size:13px;padding:12px;text-align:center">Data file failed to load. Please refresh.</div>';
      return;
    }

    const stepStr = event.precision === 0 ? '1' : (event.precision === 1 ? '0.1' : '0.01');

    root.innerHTML = `
      <div class="comparison-block">
        <div class="comparison-label">Compare against</div>
        <div class="comparison-pills" id="comparison-picker"></div>
        <div class="comparison-help">${GENERAL_BANDS[eventId] ? 'Pick a comparison context. The same number reads differently against general athletic performance vs NFL Combine position prospects.' : 'NFL Combine position prospects only. General-population comparison data for this event is queued for a future update.'}</div>
      </div>

      <div class="input-card">
        <div class="input-label">Your ${event.name.toLowerCase()}</div>
        <div class="input-row">
          <input type="number" class="big-input" id="value-input"
                 placeholder="${event.placeholder}" step="${stepStr}"
                 inputmode="decimal" aria-label="${event.name} value">
          <span class="input-unit">${event.unit}</span>
        </div>
        <div class="input-meta">${event.direction === 'lower' ? 'lower is better' : 'higher is better'} · NFL record: ${event.record.value} ${event.unit} (${event.record.holder}, ${event.record.position}, ${event.record.year})</div>
      </div>

      <div class="result-card" id="result-card">
        <div class="result-label-row">
          <span class="result-label" data-result-label>Awaiting input</span>
        </div>
        <div class="gradient-bar">
          <div class="gradient-fill"></div>
          <div class="gradient-marker" data-marker></div>
        </div>
        <div class="gradient-anchors">
          <span data-anchor-left></span>
          <span data-anchor-right></span>
        </div>
        <div class="result-feedback" data-result-feedback></div>
      </div>
    `;

    // Wire input
    const input = document.getElementById('value-input');
    input.addEventListener('input', () => {
      const raw = input.value.trim();
      if (raw === '' || isNaN(parseFloat(raw))) {
        currentValue = null;
      } else {
        currentValue = parseFloat(raw);
      }
      renderResult();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
