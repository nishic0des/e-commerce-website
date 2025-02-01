document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 32.99 },
    { id: 3, name: "Product 3", price: 24.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const empty = document.getElementById("empty-cart");
  const total = document.getElementById("cart-total");
  const totalpriceDsiplay = document.getElementById("total-price");
  const checkout = document.getElementById("checkout-btn");
  const remove = document.getElementsByClassName("remove-btn");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  products.forEach((product) => {
    const divcont = document.createElement("div");
    divcont.classList.add("product");
    divcont.innerHTML = `
   <span>${product.name}-$${product.price.toFixed(2)}</span>
   <button data-id="${product.id}">Add to cart</button>
   `;
    productList.appendChild(divcont);
  });
  productList.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      const productId = parseFloat(e.target.getAttribute("data-id"));
      const prod = products.find((p) => p.id === productId);
      addtoCart(prod);
    }
  });
  function addtoCart(prod) {
    cart.push(prod);
    save();
    renderCart();
  }
  function renderCart() {
    console.log(cart);

    cartItems.innerText = "";
    let totalprice = 0;
    if (cart.length > 0) {
      empty.classList.add("hidden");
      total.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalprice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-items");
        cartItem.innerHTML = `
        ${item.name}- $${item.price.toFixed(2)}
        <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;

        cartItem.querySelector(".remove-btn").addEventListener("click", () => {
          removeItem(item.id);
        });
        cartItems.appendChild(cartItem);
      });
      totalpriceDsiplay.textContent = `${totalprice.toFixed(2)}`;
    } else {
      empty.classList.remove("hidden");
      cartItems.innerText = empty.textContent;
      total.classList.add("hidden");
    }
  }

  checkout.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Successful");
    renderCart();
  });

  function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function removeItem(prodId) {
    cart = cart.filter((p) => p.id !== prodId);
    save();
    renderCart();
  }
});
