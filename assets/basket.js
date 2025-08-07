import { showActiveBtns } from "./product.js";

export let baskets = JSON.parse(localStorage.getItem("basket")) || [];

const basketContainer = document.querySelector(".basket-container");

const getBasketBody = () => document.querySelector(".basket-body");

const getBasketEmptyTemplate = () => {
  const template = document.querySelector(".basket-empty-template");
  return template?.content.cloneNode(true);
};

const createBasketItem = (item) => {
  const wrapper = document.createElement("div");
  wrapper.className =
    "d-flex align-items-start border-bottom pb-3 pt-3 mb-3 basket-item";

  wrapper.innerHTML = `
    <img src="${item.image}" class="me-3" alt="${item.title}" />
    <div class="flex-grow-1">
      <a href="${item.link}" class="text-decoration-none fw-bold text-primary">${item.title}</a>
      <div class="text-muted">QTY: 1</div>
      <div class="fw-semibold mt-1">$${item.price}</div>
    </div>
    <button data-id="${item.id}" class="remove-basket-btn btn text-decoration-none text-danger ms-3">
      Remove
    </button>
  `;

  return wrapper;
};

const createBasketTemplate = () => {
  return `
    <div class="basket-header">
      <h6>My basket</h6>
      <i class="bx bx-x close-basket"></i>
    </div>
    <div class="basket-body"></div>
    <div class="basket-bottom">
      <div class="basket-result d-flex justify-content-between">
        <h6>Cart total</h6>
        <span>$ <b class="basket-price">0.00</b></span>
      </div>
      <div class="d-flex column-gap-3 basket-actions">
        <button class="btn btn-dark w-100">View cart</button>
        <button class="btn btn-warning w-100">Checkout</button>
      </div>
    </div>
  `;
};

const addCloseButtonEvent = () => {
  const closeBtn = document.querySelector(".close-basket");
  closeBtn?.addEventListener("click", () => {
    basketContainer.classList.remove("show");
    setTimeout(() => {
      basketContainer.style.display = "none";
    }, 500);
  });
};

const renderEmptyState = () => {
  const emptyState = getBasketEmptyTemplate();
  if (emptyState) basketContainer.appendChild(emptyState);
};

export const setupBasketItems = () => {
  basketContainer.innerHTML = "";
  if (baskets.length === 0) {
    renderEmptyState();
    return;
  }

  basketContainer.innerHTML = createBasketTemplate();
  renderBasketItems();
  addCloseButtonEvent();
};

const renderBasketItems = () => {
  const basketBody = getBasketBody();
  if (!basketBody) return;

  const fragment = document.createDocumentFragment();

  baskets.forEach((item) => {
    fragment.appendChild(createBasketItem(item));
  });

  basketBody.appendChild(fragment);

  setRemoveBtnEvents();
};

export const setBasketResult = () => {
  const basketCountEl = document.querySelector(".basket-count");
  if (basketCountEl) {
    basketCountEl.textContent = baskets.length.toString();
  }

  const totalAmount = baskets.reduce((acc, item) => acc + item.price, 0);

  const basketPriceEls = document.querySelectorAll(".basket-price");
  basketPriceEls.forEach((el) => {
    el.textContent = totalAmount.toFixed(2);
  });
};

export const setRemoveBtnEvents = () => {
  const removeBtns = document.querySelectorAll(".remove-basket-btn");

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      baskets = baskets.filter((item) => item.id !== id);
      localStorage.setItem("basket", JSON.stringify(baskets));
      setupBasketItems();
      setBasketResult();
      showActiveBtns();
    });
  });
};
