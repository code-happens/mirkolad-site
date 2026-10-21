// Wideo z aplikacji: pobiera się i gra dopiero, gdy jest na ekranie; poza ekranem stoi.
// Przy wyłączonych animacjach w systemie zostaje pierwsza klatka z przyciskami odtwarzania.
(() => {
  const clips = document.querySelectorAll('.clip video');
  if (!clips.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    clips.forEach((v) => { v.controls = true; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => { v.controls = true; });
      else v.pause();
    }
  }, { threshold: 0.35 });
  clips.forEach((v) => io.observe(v));
})();
