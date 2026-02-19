// ==============================================
// LANGUAGE TOGGLE SYSTEM
// Switches all texts between French and English
// Saves the selected language in the browser
// Animates the button on click
// Updates button label and page title dynamically
// ==============================================


// 1️⃣ Select the language toggle button
const toggleButton = document.getElementById("lang-toggle");


// 2️⃣ Default language is French
let currentLanguage = "fr";


// ==============================================
// 3️⃣ FUNCTION → APPLY LANGUAGE TO THE PAGE
// This updates:
// - HTML lang attribute
// - All translated elements
// - Button label
// - Page title
// ==============================================
function applyLanguage(language) {

  // Update current language
  currentLanguage = language;

  // Update HTML lang attribute (important for SEO & accessibility)
  document.documentElement.lang = language;

  // Select all elements that contain translations
  const elements = document.querySelectorAll("[data-fr]");

  // Replace text content according to selected language
  elements.forEach(element => {
    element.textContent = element.getAttribute(`data-${language}`);
  });

  // ==========================================
  // Update page title dynamically
  // ==========================================
  if (language === "fr") {
    document.title = "Ines Kaci — Développeuse Web";
  } else {
    document.title = "Ines Kaci — Web Developer";
  }

  // ==========================================
  // Update toggle button label
  // FR site → show FR | EN
  // EN site → show EN | FR
  // ==========================================
  if (language === "fr") {
    toggleButton.textContent = "FR | EN";
  } else {
    toggleButton.textContent = "EN | FR";
  }

  // ==========================================
  // Save selected language in browser memory
  // ==========================================
  localStorage.setItem("language", language);
}


// ==============================================
// 4️⃣ CHECK IF LANGUAGE IS SAVED ON PAGE LOAD
// ==============================================
const savedLanguage = localStorage.getItem("language");

if (savedLanguage) {
  applyLanguage(savedLanguage);
} else {
  applyLanguage("fr"); // default
}


// ==============================================
// 5️⃣ CLICK EVENT → SWITCH LANGUAGE
// ==============================================
toggleButton.addEventListener("click", () => {

  // Toggle language
  if (currentLanguage === "fr") {
    applyLanguage("en");
  } else {
    applyLanguage("fr");
  }

  // ==========================================
  // Button click animation
  // ==========================================
  toggleButton.classList.add("active");

  setTimeout(() => {
    toggleButton.classList.remove("active");
  }, 400);

});

