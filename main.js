// Get references to DOM elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartButton = document.getElementById('btn');
const cartContainer = document.querySelector('.container-cart');
const cartItemsContainer = document.querySelector('.container-cart .cart-items-container');
const totalPriceStrip = document.querySelector('.total-price-strip');

// Initialize cart as an empty array
const cart = [];

// Function to update the cart and display it
// Function to update the cart and display it
function updateCart() {
    // Clear the cart container
    cartItemsContainer.innerHTML = '';

    // Initialize the total price
    let totalPrice = 0;

    // Limit the number of items displayed to eight
    const displayedItems = cart.slice(0, 8);

    // Loop through displayed items in the cart
    displayedItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Add item price to the total price
        totalPrice += item.price;
    });

    // Update the total price strip
    totalPriceStrip.textContent = `Total: $${totalPrice.toFixed(2)}`;
}


// Function to toggle the cart visibility
function toggleCart() {
    if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
        cartContainer.style.display = 'block';
    } else {
        cartContainer.style.display = 'none';
    }
}

// Add click event listeners to "Add to Cart" buttons
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get information about the clicked item
        const item = {
            name: button.parentElement.querySelector('h2').textContent,
            price: parseFloat(button.parentElement.querySelector('.price').textContent.slice(1)),
            index: index, // You can use this index to identify the item
        };

        // Add the item to the cart
        cart.push(item);

        // Update the cart and display it
        updateCart();
    });
});

// Add click event listener to the cart button to toggle the cart visibility
cartButton.addEventListener('click', () => {
    toggleCart();
});

// Add click event listener to remove items from the cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Remove the item from the cart array
        updateCart(); // Update the cart display
    }
});
