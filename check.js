function displayCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total-checkout').textContent = `Total: $${total.toFixed(2)}`;
}

function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked');

    let valid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (!name) {
        document.getElementById('name-error').textContent = 'Name is required.';
        valid = false;
    }

    if (!contact || !/^98\d{8}$/.test(contact)) {
        document.getElementById('contact-error').textContent = 'Contact number must be 10 digits starting with "98".';
        valid = false;
    }

    if (!address) {
        document.getElementById('address-error').textContent = 'Address is required.';
        valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Enter a valid email address.';
        valid = false;
    }

    if (!payment) {
        alert('Please select a payment option.');
        valid = false;
    }

