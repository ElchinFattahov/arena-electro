import { exampleFn } from "./basket.js";

//up
const upButton = document.querySelector(".up");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    upButton.classList.add("show");
  } else {
    upButton.classList.remove("show");
  }
});

upButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//DARK-LIGHT MODE
const lightBtn = document.querySelector(".theme-btn.light");
const darkBtn = document.querySelector(".theme-btn.dark");

function activateTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");

    lightBtn.classList.add("active");
    darkBtn.classList.remove("active");
  } else if (theme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");

    darkBtn.classList.add("active");
    lightBtn.classList.remove("active");
  }

  localStorage.setItem("selectedTheme", theme);
}

lightBtn.addEventListener("click", () => activateTheme("light"));
darkBtn.addEventListener("click", () => activateTheme("dark"));

const savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
  activateTheme(savedTheme);
} else {
  activateTheme("light");
}

// scroll
window.addEventListener("scroll", function () {
  const headerTop = document.getElementById("headertop");

  if (window.scrollY > 0) {
    headerTop.classList.add("scrolled");
  } else {
    headerTop.classList.remove("scrolled");
  }
});

// MOBILE SCREEN
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

menuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

const dropdowns = document.querySelectorAll(".has-dropdown");

dropdowns.forEach((drop) => {
  drop.addEventListener("click", function () {
    const submenu = this.querySelector(".submenu");
    if (submenu) {
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    }
  });
});

// COURSEL-BANNER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let currentIndex = 0;

function updateSlider() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[currentIndex].classList.add("active");

  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  updateButtonStates();
}

function updateButtonStates() {
  if (currentIndex === 0) {
    prevBtn.style.pointerEvents = "none";
    prevBtn.style.cursor = "not-allowed";
    prevBtn.style.opacity = "0.5";
  } else {
    prevBtn.style.pointerEvents = "auto";
    prevBtn.style.cursor = "pointer";
    prevBtn.style.opacity = "1";
  }

  if (currentIndex === slides.length - 1) {
    nextBtn.style.pointerEvents = "none";
    nextBtn.style.cursor = "not-allowed";
    nextBtn.style.opacity = "0.5";
  } else {
    nextBtn.style.pointerEvents = "auto";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.opacity = "1";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

function updateSlideImages() {
  const slideImages = document.querySelectorAll(".slide-content img");
  const mobileSrc =
    "https://arena-electro.myshopify.com/cdn/shop/files/slide-mobile-h17-1.png?v=1732242325&width=767";
  const desktopSrc =
    "https://arena-electro.myshopify.com/cdn/shop/files/slide-h17-1.png?v=1732242188&width=1920";

  if (window.innerWidth <= 992) {
    slideImages.forEach((img) => {
      img.src = mobileSrc;
    });
  } else {
    slideImages.forEach((img) => {
      img.src = desktopSrc;
    });
  }
}

updateSlideImages();
updateSlider();

window.addEventListener("resize", updateSlideImages);

// SLIDER
document.addEventListener("DOMContentLoaded", () => {
  exampleFn();

  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".dots");
  const cards = document.querySelectorAll(".product-card");

  let slidesToShow = 4;
  let slidesToScroll = 1;
  let dotCount = 2;
  let currentIndex = 0;
  const gap = 15;

  function updateSettings() {
    const width = window.innerWidth;
    if (width > 992) {
      slidesToShow = 4;
      slidesToScroll = 1;
      dotCount = 2;
    } else if (width > 576) {
      slidesToShow = 3;
      slidesToScroll = 2;
      dotCount = 2;
    } else {
      slidesToShow = 2;
      slidesToScroll = 2;
      dotCount = 3;
    }
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
  }

  function moveToIndex(index) {
    const cardWidth = cards[0].offsetWidth + gap;
    let offset = 0;

    if (window.innerWidth > 992) {
      offset = index * slidesToScroll * cardWidth;
    } else if (window.innerWidth > 576) {
      offset = index * slidesToScroll * cardWidth;
    } else {
      if (index === 0) {
        offset = 0;
      } else if (index === 1) {
        offset = slidesToScroll * cardWidth;
      } else if (index === 2) {
        offset = (slidesToScroll + 1) * cardWidth;
      }
    }

    const maxOffset = (cards.length - slidesToShow) * cardWidth;
    if (offset > maxOffset) offset = maxOffset < 0 ? 0 : maxOffset;

    track.style.transform = `translateX(-${offset}px)`;
    currentIndex = index;
    updateActiveDot();
  }

  function updateActiveDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      const index = Number(e.target.dataset.index);
      moveToIndex(index);
    }
  });

  function init() {
    updateSettings();
    createDots();
    moveToIndex(0);
  }

  window.addEventListener("resize", () => {
    const prevDotCount = dotCount;
    updateSettings();
    if (prevDotCount !== dotCount) {
      createDots();
      moveToIndex(0);
    } else {
      moveToIndex(currentIndex);
    }
  });

  init();
});
