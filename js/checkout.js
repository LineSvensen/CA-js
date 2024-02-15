// Function to retrieve cart data from local storage
function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    } else {
        return [];
    }
}

// Function to display the cart contents on the confirmation page
function displayCartOnConfirmationPage() {
    const cart = getCartFromLocalStorage();
    const cartContainer = document.getElementById('cart-container');
    const totalValueElement = document.getElementById('total-value');

    // Clear previous cart content
    cartContainer.innerHTML = '';

    // Initialize total value
    let totalValue = 0;

    // Display each product in the cart
    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <p>${product.price}</p>
                <button class="remove-btn" data-product-index="${index}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        // Accumulate the price of each product to calculate total value
        totalValue += parseFloat(product.price);
    });

    // Display the total value
    totalValueElement.textContent = `Total Value: $${totalValue.toFixed(2)}`;

    // Event listener to remove a product from the cart
    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            const productIndex = parseInt(event.target.dataset.productIndex);
            if (!event.target.disabled) {
                event.target.disabled = true; // Disable the button to prevent multiple clicks
                removeFromCart(productIndex);
            }
        }
    });
}

// Function to remove a product from the cart
function removeFromCart(productIndex) {
    const cart = getCartFromLocalStorage();
    if (productIndex >= 0 && productIndex < cart.length) {
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        // After removing, refresh the cart display
        displayCartOnConfirmationPage();
    } else {
        console.error(`Invalid product index: ${productIndex}`);
    }
}

// Call the function to display cart contents on page load
window.addEventListener('load', function() {
    displayCartOnConfirmationPage();
});

// Event listener for the checkout button
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', function() {
    // Show the loading animation
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';

    // Simulate some loading time (optional)
    setTimeout(function() {
        // Hide the loading animation
        loadingAnimation.style.display = 'none';

        // Navigate to the next page
        window.location.href = 'confirmation.html';
    }, 1000); // 1000 milliseconds (1 seconds) as an example loading time
});



//
// const checkoutBtn = document.getElementById("checkout-btn");
// checkoutBtn.addEventListener("click", function() {
//     window.location.href = "http://localhost:63342/CA-js/confirmation.html"
// });
//
// // Event listener for the checkout button
// const checkoutBtn = document.getElementById("checkout-btn");
// checkoutBtn.addEventListener("click", function() {
//     // Show the loading animation
//     const loadingAnimation = document.getElementById("loading-animation");
//     loadingAnimation.style.display = "block";
//
//     // Simulate some loading time (optional)
//     setTimeout(function() {
//         // Hide the loading animation
//         loadingAnimation.style.display = "none";
//
//         // Navigate to the next page
//         window.location.href = "http://localhost:63342/CA-js/confirmation.html";
//     }, 2000); // 2000 milliseconds (2 seconds) as an example loading time
// });


// The problem was likely caused by multiple clicks on the remove button, which
// triggered the removeFromCart function multiple times in rapid succession.
//     To address this issue, I added a mechanism to disable the remove button immediately after it's clicked. ' +
// 'This prevents further clicks until the removal process is complete, ensuring that the removeFromCart function is ' +
// 'called only once for ' +
// 'each click, thus resolving the problem of multiple products being removed simultaneously.


// // Function to retrieve cart data from local storage
// function getCartFromLocalStorage() {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         return JSON.parse(storedCart);
//     } else {
//         return [];
//     }
// }
//
// // Function to display the cart contents on the confirmation page
// function displayCartOnConfirmationPage() {
//     const cart = getCartFromLocalStorage();
//     const cartContainer = document.getElementById('cart-container');
//     const totalValueElement = document.getElementById('total-value');
//
//     // Clear previous cart content
//     cartContainer.innerHTML = '';
//
//     // Initialize total value
//     let totalValue = 0;
//
//     // Display each product in the cart
//     cart.forEach((product, index) => {
//         const cartItem = document.createElement("div");
//         cartItem.innerHTML = `
//             <div>
//                 <img src="${product.image}" alt="${product.title}">
//                 <p>${product.title}</p>
//                 <p>${product.price}</p>
//                 <button class="remove-btn" data-product-index="${index}">Remove</button>
//             </div>
//         `;
//         cartContainer.appendChild(cartItem);
//
//         // Accumulate the price of each product to calculate total value
//         totalValue += parseFloat(product.price);
//     });
//
//     // Display the total value
//     totalValueElement.textContent = `Total Value: $${totalValue.toFixed(2)}`;
//
//     // Event listener to remove a product from the cart
//     cartContainer.addEventListener("click", function (event) {
//         if (event.target.classList.contains("remove-btn")) {
//             const productIndex = parseInt(event.target.dataset.productIndex);
//             removeFromCart(productIndex);
//         }
//     });
// }
//
// // Function to remove a product from the cart
// function removeFromCart(productIndex) {
//     const cart = getCartFromLocalStorage();
//     if (productIndex >= 0 && productIndex < cart.length) {
//         cart.splice(productIndex, 1);
//         localStorage.setItem('cart', JSON.stringify(cart));
//         // After removing, refresh the cart display
//         displayCartOnConfirmationPage();
//     } else {
//         console.error(`Invalid product index: ${productIndex}`);
//     }
// }
//
// // Call the function to display cart contents on page load
// window.addEventListener('load', function() {
//     displayCartOnConfirmationPage();
// });

// // Function to retrieve cart data from local storage
// function getCartFromLocalStorage() {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         return JSON.parse(storedCart);
//     } else {
//         return [];
//     }
// }
// }