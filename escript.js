const products = [
  { id: 1, 
    name: "CHAIN", 
    price: 850 ,
    image:"product1.jpg"
  },
  { id: 2, 
   name: "BRACELETE", 
   price: 1000,
   image:"product2.jpg"
  },
  { id: 3, 
   name: "EAR RINGS", 
   price: 700 ,
   image:"product3.jpeg"},
];

const cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto;" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}


function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalP = document.getElementById("total");

  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} x ${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });

  totalP.textContent = `Total: $${total}`;
}

renderProducts();
