// Cart functionality
let cartCount = 0;
let cartItems = [];
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const closeCartButton = document.querySelector('.close-cart');
const checkoutButton = document.querySelector('.checkout-button');
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const paymentDetails = document.getElementById('payment-details');

// Create a notification element
const createNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Update cart total
const updateCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const deliveryFee = 40;
    const total = subtotal + deliveryFee;
    
    subtotalElement.textContent = `₹${subtotal}`;
    totalElement.textContent = `₹${total}`;
};

// Update cart display
const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="cart-item-price">₹${item.price}</span>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    updateCartTotal();
};

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = parseInt(menuItem.querySelector('.price').textContent.replace('₹', ''));
        
        cartItems.push({
            name: itemName,
            price: itemPrice
        });
        
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animation effect
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4CAF50';
        
        // Show thank you message
        createNotification(`Thank you for ordering ${itemName} from EATSOnclick! Your order has been added to cart.`);
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#FF4B2B';
        }, 1000);
    });
});

// Cart modal functionality
document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.classList.add('active');
    updateCartDisplay();
});

closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Remove item from cart
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cartItems.splice(index, 1);
        cartCount--;
        cartCountElement.textContent = cartCount;
        updateCartDisplay();
    }
});

// Payment method selection
paymentOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        const paymentMethod = e.target.value;
        let paymentHTML = '';
        
        switch(paymentMethod) {
            case 'upi':
                paymentHTML = `
                    <div class="upi-details">
                        <input type="text" placeholder="Enter UPI ID" id="upi-id">
                    </div>
                `;
                break;
            case 'card':
                paymentHTML = `
                    <div class="card-details">
                        <input type="text" placeholder="Card Number" id="card-number">
                        <input type="text" placeholder="MM/YY" id="card-expiry">
                        <input type="text" placeholder="CVV" id="card-cvv">
                    </div>
                `;
                break;
            case 'cod':
                paymentHTML = `
                    <div class="cod-details">
                        <p>Pay when you receive your order</p>
                    </div>
                `;
                break;
        }
        
        paymentDetails.innerHTML = paymentHTML;
    });
});

// Checkout process
checkoutButton.addEventListener('click', () => {
    if (cartItems.length === 0) {
        createNotification('Your cart is empty!');
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    let isValid = true;

    switch(selectedPayment) {
        case 'upi':
            const upiId = document.getElementById('upi-id').value;
            if (!upiId) {
                createNotification('Please enter your UPI ID');
                isValid = false;
            }
            break;
        case 'card':
            const cardNumber = document.getElementById('card-number').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            if (!cardNumber || !cardExpiry || !cardCvv) {
                createNotification('Please fill in all card details');
                isValid = false;
            }
            break;
    }

    if (isValid) {
        // Simulate payment processing
        createNotification('Processing your payment...');
        setTimeout(() => {
            createNotification('Payment successful! Your order has been placed.');
            cartItems = [];
            cartCount = 0;
            cartCountElement.textContent = '0';
            cartModal.classList.remove('active');
        }, 2000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    createNotification('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = document.querySelector('.nav-links').innerHTML;
    
    navbar.appendChild(mobileMenuButton);
    document.body.appendChild(mobileMenu);
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
};

// Initialize mobile menu
createMobileMenu();

// Add animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
}); 