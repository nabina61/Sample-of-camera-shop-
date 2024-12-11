const products = [
    { name: "Cannon", image: "cannon.webp", price: 200.00 },
    { name: "Nikon", image: "Nikon.jpeg", price: 180.00 },
    { name: "Paasonic", image: "paasonic.jpg", price: 160.00 },
    { name:  "Sony"  , image: "Sony.webp",price: 150.00},
    // Add more products as needed
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('checkout-btn').disabled = cart.length === 0;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productIndex) {
    const product = products[productIndex];
    const existingItemIndex = cart.findIndex(item => item.name === product.name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity, 10);
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

window.onload = () => {
    displayProducts();
    updateCart();
};
