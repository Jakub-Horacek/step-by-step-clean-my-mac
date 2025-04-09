// Import external links configuration
import { externalLinks } from "./config/links.js";

// Make toggleExpand function available globally
window.toggleExpand = function (elementId, buttonId) {
  const element = document.getElementById(elementId);
  element.classList.toggle("hidden");

  const button = document.getElementById(buttonId);
  button.classList.toggle("expanded");
};

// Initialize i18next
i18next.init({
  lng: "en-US", // default language
  fallbackLng: "en-US",
  resources: {
    "en-US": {
      translation: {},
    },
    "cs-CZ": {
      translation: {},
    },
  },
});

// Load translations from JSON files
async function loadTranslations() {
  try {
    const [enResponse, csResponse] = await Promise.all([fetch("/locales/en-US.json"), fetch("/locales/cs-CZ.json")]);

    const enTranslations = await enResponse.json();
    const csTranslations = await csResponse.json();

    // Replace link parameters with actual HTML
    const processTranslations = (translations) => {
      const processObject = (obj) => {
        for (let key in obj) {
          if (typeof obj[key] === "string") {
            for (let linkKey in externalLinks) {
              obj[key] = obj[key].replace(`{${linkKey}}`, externalLinks[linkKey]);
            }
          } else if (typeof obj[key] === "object") {
            processObject(obj[key]);
          }
        }
        return obj;
      };
      return processObject(JSON.parse(JSON.stringify(translations)));
    };

    const processedEnTranslations = processTranslations(enTranslations);
    const processedCsTranslations = processTranslations(csTranslations);

    i18next.addResourceBundle("en-US", "translation", processedEnTranslations, true, true);
    i18next.addResourceBundle("cs-CZ", "translation", processedCsTranslations, true, true);

    // Set initial language
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en-US";
    await i18next.changeLanguage(savedLanguage);

    // Update all translations
    updateTranslations();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Language switching functionality
const languages = {
  "en-US": { flag: "🇺🇸", name: "English" },
  "cs-CZ": { flag: "🇨🇿", name: "Czech" },
};

let currentLang = localStorage.getItem("preferredLanguage") || "en-US";

async function switchLanguage() {
  currentLang = currentLang === "en-US" ? "cs-CZ" : "en-US";
  localStorage.setItem("preferredLanguage", currentLang);
  document.querySelector(".current-lang").textContent = languages[currentLang].flag;
  await i18next.changeLanguage(currentLang);
  updateTranslations();
}

// Function to update text content with translations
function updateTextContent() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = i18next.t(key);

    // Check if the element should render HTML
    if (element.hasAttribute("data-i18n-html")) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });
}

// Function to update all translations
function updateTranslations() {
  updateTextContent();
}

// Function to load HTML content
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    updateTranslations();
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load all components when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load translations first
    await loadTranslations();

    // Then load all components
    await loadComponent("language-switcher", "/components/language-switcher.html");
    await loadComponent("manual-clean", "/components/manual-clean.html");
    await loadComponent("third-party-tools", "/components/third-party-tools.html");
    await loadComponent("bonuses", "/components/bonuses.html");
    await loadComponent("notes", "/components/notes.html");

    // Initialize language switcher after component is loaded
    const languageToggle = document.getElementById("languageToggle");
    if (languageToggle) {
      languageToggle.addEventListener("click", switchLanguage);
      document.querySelector(".current-lang").textContent = languages[currentLang].flag;
    }

    // Set the current year in the footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Add click to copy functionality
    document.querySelectorAll(".code").forEach((codeBlock) => {
      codeBlock.addEventListener("click", () => {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
          codeBlock.classList.add("copied");
          setTimeout(() => {
            codeBlock.classList.remove("copied");
          }, 2000);
        });
      });
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
