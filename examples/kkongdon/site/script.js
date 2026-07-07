const subtitle = document.querySelector("[data-qa='hero-subtitle']");
const chips = document.querySelectorAll(".chip");
const progress = document.querySelector("[data-qa='scroll-progress']");
const reveals = document.querySelectorAll(".reveal");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    subtitle.textContent = chip.dataset.message;
    chip.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12) rotate(-2deg)" },
        { transform: "scale(1)" }
      ],
      { duration: 360, easing: "ease-out" }
    );
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.24 }
);

reveals.forEach((section) => observer.observe(section));

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.max(0, Math.min(1, amount))})`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

