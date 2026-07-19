document.addEventListener('DOMContentLoaded', () => {
  initMarquee();
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
