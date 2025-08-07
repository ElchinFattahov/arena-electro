import { baskets, setBasketResult, setupBasketItems } from "./basket.js";

const fetchProducts = async () => {
  const response = await fetch("/assets/product.json");
  return await response.json();
};

let products = [];

const createProductCard = (product) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-card";
  wrapper.innerHTML = `
    <div class="products-title">
      <a href="#">${product.category}</a> <br />
      <a href="#">${product.title}</a>
    </div>
    <div class="products-pic">
      <div class="products-labels">
        <div class="label1"><span>NEW</span></div>
        <img src="${product.image}" alt="${product.title}" />
      </div>
    </div>
    <div class="products-price">
      <span>$${product.price}</span>
      <div class="basket ${
        baskets.some((x) => x.id == product.id) ? "active" : ""
      }" data-id="${product.id}">
        <i class="bx bx-basket"></i>
      </div>
    </div>
    <div class="product-icons">
      <div class="icon-border">
        <i class="bx bx-fullscreen"></i>
        <i class="bx bx-heart"></i>
      </div>
    </div>
  `;
  return wrapper;
};

const renderProducts = (data) => {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  const fragment = document.createDocumentFragment();
  data.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  productList.appendChild(fragment);
};

export const showActiveBtns = () => {
  let btns = document.querySelectorAll(".basket");

  for (const btn of btns) {
    const productId = Number(btn.dataset.id);
    const alreadyInBasket = baskets.some((x) => x.id == productId);
    if (alreadyInBasket) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
};

const handleBasketClick = (event) => {
  const basketBtn = event.target.closest(".basket");
  if (!basketBtn) return;

  const productId = Number(basketBtn.dataset.id);
  const product = products.find((p) => p.id === productId);
  const alreadyInBasket = baskets.some((item) => item.id === productId);

  if (!alreadyInBasket && product) {
    baskets.push(product);
    localStorage.setItem("basket", JSON.stringify(baskets));
    setupBasketItems();
    setBasketResult();
    showActiveBtns();
  }
};

export const showProducts = async () => {
  try {
    products = await fetchProducts();
    renderProducts(products);

    const productList = document.querySelector(".product-list");
    productList.addEventListener("click", handleBasketClick);
  } catch (err) {
    alert("Error fetching products: " + err.message);
  }
};
