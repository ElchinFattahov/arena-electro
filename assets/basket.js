let baskets = [];

let basketContainer = document.querySelector(".basket-container");

export const showEmptyState = () => {
  if (!baskets.length) {
    let basketEmpty = document.querySelector(".basket-empty-template");
    let clon = basketEmpty.content.cloneNode(true);
    basketContainer.appendChild(clon);
  }
};
