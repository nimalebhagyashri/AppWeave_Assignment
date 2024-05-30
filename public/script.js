const products = [
  { id: 1, name: 'Black polo', price: 300, type: 'Polo', color: 'Black', gender: 'Men', image: 'images/black-polo.jpg' },
  { id: 2, name: 'Blue polo', price: 300, type: 'Polo', color: 'Blue', gender: 'Men', image: 'images/blue-polo.jpg' },
  { id: 3, name: 'Green Shirt', price: 500, type: 'Basic', color: 'Green', gender: 'Men', image: 'images/green-shirt.jpg' },
  { id: 4, name: 'Black hoodie', price: 300, type: 'Hoodie', color: 'Black', gender: 'Men', image: 'images/black-hoodie.jpg' },
  { id: 5, name: 'Pink round', price: 250, type: 'Basic', color: 'Pink', gender: 'Women', image: 'images/pink-round.jpg' },
  { id: 6, name: 'Pink hoodie', price: 500, type: 'Hoodie', color: 'Pink', gender: 'Women', image: 'images/pink-hoodie.jpg' },
  { id: 7, name: 'Green Tshirt', price: 250, type: 'Basic', color: 'Green', gender: 'Women', image: 'images/green-tshirt.jpg' },
];

const productContainer = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-items');
const applyFiltersBtn = document.getElementById('applyFilters');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let cartItems = [];

function renderProducts(productsToRender) {
  productContainer.innerHTML = '';
  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: Rs ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to cart</button>
    `;
    productContainer.appendChild(productCard);
  });
}

function searchProducts(query) {
  query = query.toLowerCase();
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(query) || 
      product.type.toLowerCase().includes(query) || 
      product.color.toLowerCase().includes(query)
    );
  });
  renderProducts(filteredProducts);
}

function renderCart() {
  cartContainer.innerHTML = '';
  let totalPrice = 0;
  let totalCount = 0;

  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      ${item.name} - Rs ${item.price} 
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" />
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;
  });

  if (totalCount > 0) {
    const lineElement = document.createElement('hr');
    cartContainer.appendChild(lineElement);

    const totalElement = document.createElement('li');
    totalElement.innerHTML = `<strong>Total Items: ${totalCount}, Total Price: Rs ${totalPrice}</strong>`;
    cartContainer.appendChild(totalElement);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cartItems.find(item => item.id === product.id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  renderCart();
}

function updateQuantity(productId, quantity) {
  const cartItem = cartItems.find(item => item.id === productId);

  if (cartItem && quantity > 0) {
    cartItem.quantity = parseInt(quantity, 10);
    renderCart();
  }
}

function applyFilters() {
  let filteredProducts = products;

  const colorFilters = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(input => input.value);
  const genderFilters = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(input => input.value);
  const priceFilter = document.querySelector('input[name="price"]:checked')?.value;
  const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
  if (colorFilters.length > 0) {
    filteredProducts = filteredProducts.filter(product => colorFilters.includes(product.color));
  }
  if (genderFilters.length > 0) {
    filteredProducts = filteredProducts.filter(product => genderFilters.includes(product.gender));
  }
  if (priceFilter) {
    const [min, max] = priceFilter.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => product.price >= min && (!max || product.price <= max));
  }
  if (typeFilters.length > 0) {
    filteredProducts = filteredProducts.filter(product => typeFilters.includes(product.type));
  }

  renderProducts(filteredProducts);
}

function applySearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 0) {
    searchProducts(searchTerm);
  } else {
    renderProducts(products);
  }
}

applyFiltersBtn.addEventListener('click', applyFilters);
searchButton.addEventListener('click', applySearch);

window.addEventListener('load', () => {
  renderProducts(products);
});

