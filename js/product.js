// tell JS we want to add to a part of the HTML called <section id="product-card-container-single">
const productDetailsContainer = document.getElementById("product-card-container-single");
const cartContainer = document.getElementById("render-cart-data");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const productTitle = urlParams.get('title');
const productImg = urlParams.get('image');
const productPr = urlParams.get('price');

// Function to fetch and display detailed information about the product
function getProductDetails() {
    fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
        .then(response => response.json())
        .then(productData => {
            productDetailsContainer.innerHTML = `
                <div class="product-detail">
                    <img class="prod-image" src="${productData.image}" alt="${productData.title}">
                    <h2 class="prod-title">${productData.title}</h2>
                    <p class="prod-description">${productData.description}</p>
                    <p class="prod-price">Price: ${productData.price}</p>
                    <button class="add-to-cart-btn" 
                    data-product-id="${productData.id}" data-product-title="${productData.title}" 
                    data-product-img="${productData.image}" 
                    data-product-price="${productData.price}">Add to Cart</button>
                </div>
            `;

            // Add event listener to the button
            const button = document.querySelector(".add-to-cart-btn");
            button.addEventListener("click", function(event) {
                // Retrieve product data from the button's dataset
                const productId = event.target.dataset.productId;
                const productTitle = event.target.dataset.productTitle;
                const productImg = event.target.dataset.productImg;
                const productPrice = event.target.dataset.productPrice;
                // Call the addToCart function passing the product data
                addToCart(productId, productTitle, productImg, productPrice);
            });
        })
        .catch(error => console.error("Error fetching product details:", error));
}

// Call getProductDetails function to fetch and display product details
getProductDetails();

let cart = []; // Initialize cart as an empty array

// Function to handle adding a product to the cart
function addToCart(productId, productTitle, productImg, productPrice) {
    // Check if any of the parameters are null
    if (!productId || !productTitle || !productImg || !productPrice) {
        console.error("Invalid product data provided.");
        return;
    }

    // Construct the product object
    const product = {
        id: productId,
        title: productTitle,
        image: productImg,
        price: productPrice
    };
    // Add the product to the cart array
    cart.push(product);
    console.log(`Product with ID ${productId} added to cart.`);
    // Update the displayed cart contents
    displayCart();
    // Save the updated cart to local storage
    saveCartToLocalStorage();
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display the cart contents
function displayCart() {
    // Clear previous cart content
    cartContainer.innerHTML = '';

    // Display each product in the cart
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <p>${product.price}</p>
                <button class="remove-from-cart-btn" data-product-title="${product.title}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Event listener to remove a product from the cart
cartContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const productTitle = event.target.dataset.productTitle;
        removeFromCart(productTitle);
    }
});

// Function to remove a product from the cart
function removeFromCart(productTitle) {
    // Find the index of the product with the specified title in the cart
    const index = cart.findIndex(product => product.title === productTitle);
    if (index !== -1) {
        // Remove the product from the cart
        cart.splice(index, 1);
        console.log(`Product with title ${productTitle} removed from cart.`);
        // Update the displayed cart contents
        displayCart();
        // Save the updated cart to local storage
        saveCartToLocalStorage();
    } else {
        console.error(`Product with title ${productTitle} not found in cart.`);
    }
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displayCart(); // Update the displayed cart contents
    }
}

// Call loadCartFromLocalStorage function when the page loads
window.addEventListener('load', loadCartFromLocalStorage);


// // tell JS we want to add to a part of the HTML called <section id="product-card-container-single">
// const productDetailsContainer = document.getElementById("product-card-container-single");
// const cartContainer = document.getElementById("render-cart-data");
//
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');
// const productTitle = urlParams.get('title');
// const productImg = urlParams.get('image');
// const productPr = urlParams.get('price');
//
// // Function to fetch and display detailed information about the product
// function getProductDetails() {
//     fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
//         .then(response => response.json())
//         .then(productData => {
//             productDetailsContainer.innerHTML = `
//                 <div class="product-detail">
//                     <img class="prod-image" src="${productData.image}" alt="${productData.title}">
//                     <h2 class="prod-title">${productData.title}</h2>
//                     <p class="prod-description">${productData.description}</p>
//                     <p class="prod-price">Price: ${productData.price}</p>
//                     <button class="add-to-cart-btn"
//                     data-product-id="${productData.id}" data-product-title="${productData.title}"
//                     data-product-img="${productData.image}"
//                     data-product-price="${productData.price}">Add to Cart</button>
//                 </div>
//             `;
//
//             // Add event listener to the button
//             const button = document.querySelector(".add-to-cart-btn");
//             button.addEventListener("click", function(event) {
//                 // Retrieve product data from the button's dataset
//                 const productId = event.target.dataset.productId;
//                 const productTitle = event.target.dataset.productTitle;
//                 const productImg = event.target.dataset.productImg;
//                 const productPrice = event.target.dataset.productPrice;
//                 // Call the addToCart function passing the product data
//                 addToCart(productId, productTitle, productImg, productPrice);
//             });
//         })
//         .catch(error => console.error("Error fetching product details:", error));
// }
//
// // Call getProductDetails function to fetch and display product details
// getProductDetails();
//
// const cart = [];
//
// // Function to handle adding a product to the cart
// function addToCart(productId, productTitle, productImg, productPrice) {
//     // Check if any of the parameters are null
//     if (!productId || !productTitle || !productImg || !productPrice) {
//         console.error("Invalid product data provided.");
//         return;
//     }
//
//     // Construct the product object
//     const product = {
//         id: productId,
//         title: productTitle,
//         image: productImg,
//         price: productPrice
//     };
//     // Add the product to the cart array
//     cart.push(product);
//     console.log(`Product with ID ${productId} added to cart.`);
//     // Update the displayed cart contents
//     displayCart();
// }
//
// // Function to display the cart contents
// function displayCart() {
//     // Clear previous cart content
//     cartContainer.innerHTML = '';
//
//     // Display each product in the cart
//     cart.forEach(product => {
//         const cartItem = document.createElement("div");
//         cartItem.innerHTML = `
//             <div>
//                 <img src="${product.image}" alt="${product.title}">
//                 <p>${product.title}</p>
//                 <p>${product.price}</p>
//                 <button class="remove-from-cart-btn" data-product-title="${product.title}">Remove</button>
//             </div>
//         `;
//         cartContainer.appendChild(cartItem);
//     });
// }
//
// // Event listener to remove a product from the cart
// cartContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("remove-from-cart-btn")) {
//         const productTitle = event.target.dataset.productTitle;
//         removeFromCart(productTitle);
//     }
// });
//
// // Function to remove a product from the cart
// function removeFromCart(productTitle) {
//     // Find the index of the product with the specified title in the cart
//     const index = cart.findIndex(product => product.title === productTitle);
//     if (index !== -1) {
//         // Remove the product from the cart
//         cart.splice(index, 1);
//         console.log(`Product with title ${productTitle} removed from cart.`);
//         // Update the displayed cart contents
//         displayCart();
//     } else {
//         console.error(`Product with title ${productTitle} not found in cart.`);
//     }
// }
