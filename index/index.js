// Initialize cart from localStorage if it exists
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Select all product cards
let cards = document.querySelectorAll(".selected-item-1");

// Function to toggle sections based on button clicks
function toggleSection(sectionClass, button) {
    const selectedSection = document.querySelector(`.${sectionClass}`);

    if (selectedSection.style.display === 'block') {
        selectedSection.style.display = 'none';
        button.classList.remove('active');
    } else {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(s => s.style.display = 'none');
        selectedSection.style.display = 'block';

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
}


cards.forEach((card) => {
    card.addEventListener("click", function () {
 
        const productPage = card.getAttribute("data-url");

        window.location.href = productPage;
    });
});


function addToCart(name, price, imgSrc) {
    if (cart[name]) {
        cart[name].quantity++;
        alert(`${name} quantity updated!`);
    } else {
        cart[name] = { price: price, imgSrc: imgSrc, quantity: 1 };
        alert(`${name} added to cart!`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    let totalAmount = 0; 
    let cartIsEmpty = true; 

    for (const item in cart) {
        cartIsEmpty = false; 
        const cartItem = cart[item];
        totalAmount += cartItem.price * cartItem.quantity;

       
        const listItem = document.createElement('h4');
        listItem.className = 'd-flex justify-content-between align-items-center border-bottom mb-2 pb-2';

     
        listItem.innerHTML = `
          
            <div class="d-flex align-items-center">
                <img src="${cartItem.imgSrc}" alt="${item}" style="width: 100px; height: auto; margin-right: 10px;" />
                <span>${item} <br/> $${cartItem.price.toFixed(2)}</span>
            </div>
            <div class="d-flex align-items-center">
                <button onclick="changeQuantity('${item}', -1)" class="btn btn-sm btn-danger ms-2">-</button>
                <span id="${item}-quantity" class="mx-2">${cartItem.quantity}</span>
                <button onclick="changeQuantity('${item}', 1)" class="btn btn-sm btn-success ms-2">+</button>
            </div>
            
        `;
        cartList.appendChild(listItem); 
    }

    if (cartIsEmpty) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'text-center text-muted';
        emptyMessage.innerHTML = 'Your cart is empty';
        emptyMessage.classList.add("li-item"); 
        cartList.appendChild(emptyMessage);
    }


    
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function changeQuantity(itemName, change) {
    if (cart[itemName]) {
       
        cart[itemName].quantity += change;

       
        if (cart[itemName].quantity < 1) {
            delete cart[itemName]; 
            alert(`${itemName} removed from cart.`);
        }

        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCart();
    }
}


function clearCart() {
    cart = {}; 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart(); 
}


window.onload = function() {
    updateCart(); 
};


function buyNow() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
    } else {
       
        alert("Proceeding to checkout...");
        window.location.href = "./Payment.html";
    }
}


// Check if login form is present and add event listener
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Get user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));

        // Check if user data matches the entered credentials
        if (userData && userData.email === email && userData.password === password) {
            alert('Login successful!');
            // Redirect to home page
            window.location.href = "./homePage.html"; 
        } else {
            alert('Invalid email or password');
        }
    });
}

// Check if signup form is present and add event listener
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Account created successfully!');
        // Redirect to login page
        window.location.href = './login.html';
    });
}
