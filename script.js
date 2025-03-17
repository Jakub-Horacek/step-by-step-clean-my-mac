// Global variables for translations and current language
let translations = {};
let currentLang = "en-US";

// Function to load translations
async function loadTranslations() {
  try {
    const response = await fetch("/locales/translations.csv");
    const csvText = await response.text();
    const rows = csvText.split("\n").map((row) => row.split(","));

    // Skip header row
    const headers = rows[0];
    translations = {};

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const key = row[0];
      translations[key] = {};
      for (let j = 1; j < headers.length; j++) {
        translations[key][headers[j]] = row[j];
      }
    }
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Function to translate text
function translate(key) {
  return translations[key]?.[currentLang] || key;
}

// Function to update all translatable content
function updateContent() {
  // Update meta tags
  document.title = translate("title");
  document.querySelector('meta[name="description"]').content = translate("description");
  document.querySelector('meta[property="og:title"]').content = translate("title");
  document.querySelector('meta[property="og:description"]').content = translate("description");
  document.querySelector('meta[name="twitter:title"]').content = translate("title");
  document.querySelector('meta[name="twitter:description"]').content = translate("description");

  // Update content with data-translate attributes
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = translate(key);
  });

  // Update language flag
  const langFlag = document.querySelector(".current-lang");
  langFlag.textContent = currentLang === "en-US" ? "🇺🇸" : "🇨🇿";
}

// Function to load HTML content
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    updateContent();
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Initialize language switcher
function initLanguageSwitcher() {
  const toggle = document.getElementById("languageToggle");

  toggle.addEventListener("click", () => {
    currentLang = currentLang === "en-US" ? "cs-CS" : "en-US";
    updateContent();
  });
}

// Load all components when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  // Load translations first
  await loadTranslations();

  // Load components
  await loadComponent("header", "/components/header.html");
  await loadComponent("manual-clean", "/components/manual-clean.html");
  await loadComponent("third-party-tools", "/components/third-party-tools.html");
  await loadComponent("bonuses", "/components/bonuses.html");
  await loadComponent("notes", "/components/notes.html");
  await loadComponent("footer", "/components/footer.html");
  await loadComponent("language-switcher", "/components/language-switcher.html");

  // Initialize language switcher
  initLanguageSwitcher();

  // Set the current year in the footer
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Function to toggle expand/collapse
function toggleExpand(elementId, buttonId) {
  const element = document.getElementById(elementId);
  const button = document.getElementById(buttonId);

  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    button.textContent = translate("bonuses.profile.hide");
  } else {
    element.classList.add("hidden");
    button.textContent = translate("bonuses.profile.title");
  }
}

// Add click to copy functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("code")) {
    const text = e.target.textContent;
    navigator.clipboard.writeText(text).then(() => {
      e.target.classList.add("copied");
      setTimeout(() => {
        e.target.classList.remove("copied");
      }, 2000);
    });
  }
});
