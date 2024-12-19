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

function toggleExpand(elementId, buttonId) {
  const element = document.getElementById(elementId);
  element.classList.toggle("hidden");

  const button = document.getElementById(buttonId);
  button.classList.toggle("expanded");
}
