// ======================================================
// LANGUAGE TOGGLE (FR <-> EN)
// Goal:
// - switch text content between French and English
// - switch placeholders in form fields
// - update page title + toggle button label
// - remember selected language in localStorage
// ======================================================

// Find the toggle button by its unique id in HTML.
const toggleButton = document.getElementById("lang-toggle");

// Keep the current language value in JavaScript memory.
// We start with French by default.
let currentLanguage = "fr";

// Main function that applies one language everywhere.
function applyLanguage(language) {
  // Save chosen language in runtime variable.
  currentLanguage = language;

  // Update <html lang="..."> to improve accessibility and SEO.
  document.documentElement.lang = language;

  // Select every element that has translation attributes.
  // Example: data-fr="..." and data-en="..."
  const textElements = document.querySelectorAll("[data-fr]");

  // Loop each translatable element.
  textElements.forEach(element => {
    // Build attribute name dynamically:
    // if language is "fr", key becomes "data-fr"
    // if language is "en", key becomes "data-en"
    const translatedValue = element.getAttribute(`data-${language}`);

    // Replace visible text inside the element.
    element.textContent = translatedValue;
  });

  // Select form fields that have translated placeholders.
  const placeholderElements = document.querySelectorAll("[data-fr-placeholder]");

  // Loop each field and update placeholder.
  placeholderElements.forEach(element => {
    // Build placeholder key dynamically:
    // data-fr-placeholder OR data-en-placeholder
    const translatedPlaceholder = element.getAttribute(`data-${language}-placeholder`);

    // Safety check: only set placeholder if attribute exists.
    if (translatedPlaceholder) {
      element.setAttribute("placeholder", translatedPlaceholder);
    }
  });

  // Update browser tab title and toggle button label.
  if (language === "fr") {
    document.title = "Ines Kaci — Développeuse Web";
    toggleButton.textContent = "FR | EN";
  } else {
    document.title = "Ines Kaci — Web Developer";
    toggleButton.textContent = "EN | FR";
  }

  // Save language in localStorage so page remembers it after refresh.
  localStorage.setItem("language", language);
}

// Try reading saved language from previous visits.
const savedLanguage = localStorage.getItem("language");

// Apply saved language if present, else apply French.
applyLanguage(savedLanguage || "fr");

// Handle click on toggle button.
toggleButton.addEventListener("click", () => {
  // Switch language to the opposite one.
  if (currentLanguage === "fr") {
    applyLanguage("en");
  } else {
    applyLanguage("fr");
  }

  // Small click feedback animation:
  // add class then remove it after 400ms.
  toggleButton.classList.add("active");

  setTimeout(() => {
    toggleButton.classList.remove("active");
  }, 400);
});
