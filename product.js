  const products = [
    { id: 1, name: "Chain", price: 850 },
    { id: 2, name: "Bracelet", price: 1500 },
    { id: 3, name: "Ear Rings", price: 2000 },
  ];

  const cart = [];

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
  }

  function removeFromCart(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    renderCart();
  }

  function renderCart() {
    const cartDiv = document.getElementById("cart");
    const totalEl = document.getElementById("total");

    cartDiv.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.name} x ${item.quantity} = Rs.${item.price * item.quantity}
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartDiv.appendChild(div);
    });

    totalEl.textContent = "Total: Rs." + total;
  }
  function goToCheckout() {
  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  // Redirect to payment page
  window.location.href = "payment.html";
}
