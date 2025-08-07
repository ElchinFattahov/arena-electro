import { setBasketResult, setupBasketItems } from "./basket.js";
import { showProducts } from "./product.js";

// === SCROLL TO TOP BUTTON ===
function setupScrollToTop() {
  const upButton = document.querySelector(".up");

  window.addEventListener("scroll", () => {
    upButton.classList.toggle("show", window.scrollY > 400);
  });

  upButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// === THEME SWITCHER ===
function setupThemeSwitcher() {
  const lightBtn = document.querySelector(".theme-btn.light");
  const darkBtn = document.querySelector(".theme-btn.dark");

  const activateTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");

    lightBtn.classList.toggle("active", theme === "light");
    darkBtn.classList.toggle("active", theme === "dark");

    localStorage.setItem("selectedTheme", theme);
  };

  const savedTheme = localStorage.getItem("selectedTheme") || "light";
  activateTheme(savedTheme);

  lightBtn.addEventListener("click", () => activateTheme("light"));
  darkBtn.addEventListener("click", () => activateTheme("dark"));
}

// === HEADER STICKY ON SCROLL ===
function setupStickyHeader() {
  const headerTop = document.getElementById("headertop");
  window.addEventListener("scroll", () => {
    headerTop.classList.toggle("scrolled", window.scrollY > 0);
  });
}

// === MOBILE MENU ===
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () =>
    mobileMenu.classList.add("active")
  );
  menuClose.addEventListener("click", () =>
    mobileMenu.classList.remove("active")
  );

  document.querySelectorAll(".has-dropdown").forEach((drop) => {
    drop.addEventListener("click", () => {
      const submenu = drop.querySelector(".submenu");
      if (submenu) {
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
      }
    });
  });
}

// === HERO SLIDER ===
function setupHeroSlider() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let currentIndex = 0;

  const updateSlider = () => {
    slides.forEach((s) => s.classList.remove("active"));
    slides[currentIndex].classList.add("active");
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateButtons();
  };

  const updateButtons = () => {
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === slides.length - 1;

    prevBtn.style.pointerEvents = isFirst ? "none" : "auto";
    prevBtn.style.opacity = isFirst ? "0.5" : "1";

    nextBtn.style.pointerEvents = isLast ? "none" : "auto";
    nextBtn.style.opacity = isLast ? "0.5" : "1";
  };

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

  const updateSlideImages = () => {
    const mobileSrc =
      "https://arena-electro.myshopify.com/cdn/shop/files/slide-mobile-h17-1.png?v=1732242325&width=767";
    const desktopSrc =
      "https://arena-electro.myshopify.com/cdn/shop/files/slide-h17-1.png?v=1732242188&width=1920";
    const slideImages = document.querySelectorAll(".slide-content img");

    const isMobile = window.innerWidth <= 992;
    slideImages.forEach((img) => (img.src = isMobile ? mobileSrc : desktopSrc));
  };

  updateSlider();
  updateSlideImages();

  window.addEventListener("resize", updateSlideImages);
}

// === BASKET TOGGLE ===
function setupCartToggle() {
  const cartIcon = document.querySelector(".cart");
  const basketContainer = document.querySelector(".basket-container");

  cartIcon.addEventListener("click", () => {
    basketContainer.classList.add("show");
    basketContainer.style.display = "block";
  });

  basketContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// === PRODUCT CAROUSEL ===
function setupProductCarousel() {
  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".dots");
  const cards = document.querySelectorAll(".product-card");

  let slidesToShow = 4;
  let slidesToScroll = 1;
  let dotCount = 2;
  let currentIndex = 0;
  const gap = 15;

  const updateSettings = () => {
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
  };

  const createDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
  };

  const moveToIndex = (index) => {
    const cardWidth = cards[0].offsetWidth + gap;
    let offset = index * slidesToScroll * cardWidth;

    const maxOffset = (cards.length - slidesToShow) * cardWidth;
    if (offset > maxOffset) offset = Math.max(0, maxOffset);

    track.style.transform = `translateX(-${offset}px)`;
    currentIndex = index;
    updateActiveDot();
  };

  const updateActiveDot = () => {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex]?.classList.add("active");
  };

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      const index = Number(e.target.dataset.index);
      moveToIndex(index);
    }
  });

  const init = () => {
    updateSettings();
    createDots();
    moveToIndex(0);
  };

  window.addEventListener("resize", () => {
    const prev = dotCount;
    updateSettings();
    if (prev !== dotCount) {
      createDots();
      moveToIndex(0);
    } else {
      moveToIndex(currentIndex);
    }
  });

  init();
}

// === INIT ALL ===
document.addEventListener("DOMContentLoaded", () => {
  setupScrollToTop();
  setupThemeSwitcher();
  setupStickyHeader();
  setupMobileMenu();
  setupHeroSlider();
  setupCartToggle();

  showProducts();
  setBasketResult();
  setupBasketItems();

  setupProductCarousel();
});
