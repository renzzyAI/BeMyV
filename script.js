const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const yesCard = document.getElementById("yes-card");
const backButton = document.getElementById("back-btn");
const page = document.getElementById("page");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const ensureNoButtonPositioned = () => {
  if (noButton.dataset.positioned === "true") {
    return;
  }

  const container = noButton.parentElement;
  if (!container) {
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const left = buttonRect.left - containerRect.left;
  const top = buttonRect.top - containerRect.top;

  noButton.style.position = "absolute";
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
  noButton.dataset.positioned = "true";
};

const moveNoButton = () => {
  const container = noButton.parentElement;
  if (!container) {
    return;
  }

  ensureNoButtonPositioned();

  const padding = 8;
  const maxX = container.clientWidth - noButton.offsetWidth - padding;
  const maxY = container.clientHeight - noButton.offsetHeight - padding;
  const boundX = Math.max(padding, maxX);
  const boundY = Math.max(padding, maxY);

  const currentLeft = Number.parseFloat(noButton.style.left) || 0;
  const currentTop = Number.parseFloat(noButton.style.top) || 0;
  const angle = Math.random() * Math.PI * 2;
  const hop = 80 + Math.random() * 140;
  const targetX = clamp(currentLeft + Math.cos(angle) * hop, padding, boundX);
  const targetY = clamp(currentTop + Math.sin(angle) * hop, padding, boundY);

  noButton.style.left = `${targetX}px`;
  noButton.style.top = `${targetY}px`;
};

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("mousemove", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

yesButton.addEventListener("click", () => {
  yesCard.classList.add("active");
  page.classList.add("show-yes");
});

backButton.addEventListener("click", () => {
  yesCard.classList.remove("active");
  page.classList.remove("show-yes");
});
