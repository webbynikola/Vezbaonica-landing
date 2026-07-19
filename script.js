document.addEventListener('DOMContentLoaded', () => {
  initMarquee();
  initAboutTextReveal();
  initWaveform();
});

function initMarquee() {
  const marquee = document.querySelector('.marquee');
  const track = document.getElementById('marqueeTrack');
  if (!marquee || !track) return;

  const originalGroup = track.querySelector('.marquee__group');
  if (!originalGroup) return;

  // Duplicate the group so the track always holds an even, seamless loop:
  // CSS animates translateX(0 -> -50%), so exactly two identical halves are required.
  const clone = originalGroup.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);

  // Pause the scroll while a user is hovering or focusing inside it.
  marquee.addEventListener('mouseenter', () => marquee.classList.add('is-paused'));
  marquee.addEventListener('mouseleave', () => marquee.classList.remove('is-paused'));
  marquee.addEventListener('focusin', () => marquee.classList.add('is-paused'));
  marquee.addEventListener('focusout', () => marquee.classList.remove('is-paused'));
}

function initAboutTextReveal() {
  const section = document.querySelector('.about');
  const paragraphs = document.querySelectorAll('.about__text');
  if (!section || !paragraphs.length) return;

  // Split each paragraph into one <span class="reveal-word"> per word,
  // kept in a single flat list so both paragraphs light up in reading order.
  const words = [];
  paragraphs.forEach((p) => {
    const sourceWords = p.textContent.trim().split(/\s+/);
    p.textContent = '';
    sourceWords.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.textContent = word;
      p.appendChild(span);
      words.push(span);
      if (i < sourceWords.length - 1) {
        p.appendChild(document.createTextNode(' '));
      }
    });
  });

  let ticking = false;

  function update() {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    // Progress 0 -> 1 across the section's sticky-pinned scroll range:
    // 0 when the section's top just reaches the viewport top, 1 when its
    // bottom reaches the viewport bottom (i.e. right as it un-pins).
    let progress = scrollableDistance > 0 ? -rect.top / scrollableDistance : 1;
    progress = Math.min(1, Math.max(0, progress));

    const visibleCount = Math.round(progress * words.length);
    words.forEach((word, i) => {
      word.classList.toggle('is-visible', i < visibleCount);
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

function initWaveform() {
  const container = document.getElementById('waveformBars');
  if (!container) return;

  // Deterministic PRNG (mulberry32) so the "random" waveform is stable
  // across reloads instead of reshuffling every time the page loads.
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const random = mulberry32(42);
  const barCount = 40;
  const minHeight = 6;
  const maxHeight = 40;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < barCount; i += 1) {
    const t = i / (barCount - 1);
    // Taller near both edges, dips toward the middle, then climbs back up.
    const envelope = 1 - 0.65 * 4 * t * (1 - t);
    // Organic per-bar jitter on top of the envelope, not a perfect rhythm.
    const jitter = 0.6 + random() * 0.4;
    const height = minHeight + (maxHeight - minHeight) * envelope * jitter;

    const bar = document.createElement('span');
    bar.style.height = Math.round(height * 10) / 10 + 'px';
    fragment.appendChild(bar);
  }
  container.appendChild(fragment);
}
