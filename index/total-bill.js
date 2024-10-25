// Function to calculate total price and total items from cart data
function calculateTotalAndItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let total = 0;
    let totalItems = 0;

    for (const item in cart) {
        total += cart[item].price * cart[item].quantity; // Calculate total price
        totalItems += cart[item].quantity; // Sum up total items
    }
    
    return { total, totalItems }; // Return both total price and total items
}

// Function to load order summary after payment
function loadOrderSummary() {
    // Replace these with actual data from your cart or payment process
    const orderNumber = '#123456'; // Replace with dynamic order number
    const orderDate = new Date().toLocaleDateString(); // Current date

    // Get total price and total items
    const { total, totalItems } = calculateTotalAndItems(); 

    // Update HTML elements with order summary
    document.getElementById('order-number').innerText = orderNumber;
    document.getElementById('order-date').innerText = orderDate;
    document.getElementById('total-items').innerText = `${totalItems} items`;
    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

// Call loadOrderSummary when the page loads
window.onload = function() {
    loadOrderSummary();
};
