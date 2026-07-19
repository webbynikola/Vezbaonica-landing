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

  // Bar heights (px) copied left-to-right from the Figma waveform mockup.
  const heights = [
    6.2, 15.1, 34.7, 18.7, 32.9, 40, 32.9, 18.7, 34.7, 15.1, 6.2, 22.2, 31.1,
    25.8, 25.8, 34.7, 38.2, 27.6, 34.7, 27.6, 18.7, 22.2, 11.6, 25.8, 22.2,
    25.8, 34.7, 22.2, 13.3, 6.2, 18.7, 11.6, 15.1, 20.4, 25.8, 13.3,
  ];

  const fragment = document.createDocumentFragment();
  heights.forEach((h) => {
    const bar = document.createElement('span');
    bar.style.height = h + 'px';
    fragment.appendChild(bar);
  });
  container.appendChild(fragment);
}
