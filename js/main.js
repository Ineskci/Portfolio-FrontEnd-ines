// ======================================================
// PAGE DYNAMIC INTERACTIONS
// Handles:
// 1) entrance animation on page load
// 2) reveal animation while scrolling
// 3) skills progress bar fill animation
// ======================================================

// Wait until HTML is fully parsed before selecting elements.
document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------
  // 1) LOAD ENTRANCE ANIMATION
  // ------------------------------------------------------

  // Select all elements that should appear on page load.
  const loadElements = document.querySelectorAll(".reveal-on-load");

  // Loop through every selected element.
  loadElements.forEach(element => {
    // Read the optional delay from data-delay attribute.
    // Example: data-delay="200" means 200ms wait before showing.
    const delay = Number(element.dataset.delay || 0);

    // Show element after its delay.
    setTimeout(() => {
      element.classList.add("is-visible");
      // CSS in sections.css handles the fade + slide transition.
    }, delay);
  });


  // ------------------------------------------------------
  // 2) SCROLL REVEAL ANIMATION
  // ------------------------------------------------------

  // Select sections/blocks that should animate when entering viewport.
  const scrollElements = document.querySelectorAll(".reveal-on-scroll");

  // Build an IntersectionObserver to detect visibility.
  const revealObserver = new IntersectionObserver(
    entries => {
      // entries contains one record per observed element change.
      entries.forEach(entry => {
        // If at least threshold is visible, reveal element.
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Stop observing this element after first reveal.
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      // Trigger when about 20% of element is visible.
    }
  );

  // Attach observer to each scroll-reveal element.
  scrollElements.forEach(element => revealObserver.observe(element));


  // ------------------------------------------------------
  // 3) SKILLS PROGRESS BAR ANIMATION
  // ------------------------------------------------------

  // Select skills section once.
  const skillsSection = document.querySelector(".skills");

  // Only continue if skills section exists on page.
  if (skillsSection) {
    // Another observer dedicated to skills section.
    const skillsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add class that triggers CSS width transitions on bars.
            skillsSection.classList.add("is-visible");

            // Stop observing because we only want animation once.
            skillsObserver.unobserve(skillsSection);
          }
        });
      },
      {
        threshold: 0.25,
        // Start when 25% of skills block appears.
      }
    );

    // Start observing the skills section.
    skillsObserver.observe(skillsSection);
  }
});
