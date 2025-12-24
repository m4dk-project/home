let cart = [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");

function addToCart(name, price, image) {
  const item = {
    name, 
    price,
    image,
    quantity: 1
  };
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    let itemElement = document.createElement("div");
    itemElement.className = "list-group-item d-flex justify-content-between align-items-center";
    itemElement.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; border-radius:5%;" />
        <div class="ms-3">
          <div>${item.name}</div>
          <div class="text-success">Rp ${item.price.toLocaleString()}</div>
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Hapus</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  if (cart.length > 0) {
    let totalDiv = document.createElement("div");
    totalDiv.className = "text-end fw-bold my-3";
    totalDiv.innerHTML = `<p><i>Total: Rp ${total.toLocaleString()}</i></p>`;
    cartItems.appendChild(totalDiv);
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  
  let message = "📦 *Pesanan Saya*:\n\n";
  let total = 0;
  
  cart.forEach(item => {
    message += `▪️ ${item.name} - Rp ${item.price.toLocaleString()}\n`;
    total += item.price;
  });
  message += `\n💰 *Total*: Rp ${total.toLocaleString()}`;
  message += `\n\nSilakan hubungi saya di: (via WhatsApp/BBM/Telegram)`;

  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  window.open(waLink, '_blank');
}

function toggleCart() {
  const cartSection = document.getElementById("cart");
  cartSection.classList.toggle("d-none");
}
