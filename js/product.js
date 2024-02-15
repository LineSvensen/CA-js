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

const cart = [];

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
    } else {
        console.error(`Product with title ${productTitle} not found in cart.`);
    }
}

// // Tell JS we want to add to a part of the HTML called <section id="product-card-container-single">
// const productDetailsContainer = document.getElementById("product-card-container-single");
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
//                     <button id="add-to-cart-btn" data-product-title="${productData.title}" data-product-img="${productData.image}" data-product-price="${productData.price}">Add to Cart</button>
//                 </div>
//             `;
//
//             // Add event listener to the button
//             const button = document.querySelector("#add-to-cart-btn");
//             button.addEventListener("click", function(event) {
//                 // Call the addToCart function passing the productId, productTitle, productImg, and productPrice
//                 addToCart(productId, productTitle, productImg, productPr);
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
//     const cartContainer = document.getElementById("render-cart-data");
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
// const cartContainer = document.getElementById("render-cart-data");
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






// 1

// // tell JS we want to add to a part of the HTML called <section id="product-card-container-single">
// const productDetailsContainer = document.getElementById("product-card-container-single");
//
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');
// const productImg = urlParams.get('image');
// const productPr = urlParams.get('price');
// const productTitle = urlParams.get('title');
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
//                     <button id="add-to-cart-btn">Add to Cart</button>
//                 </div>
//             `;
//
//             // Add event listener to the button
//             const button = document.querySelector("#add-to-cart-btn");
//             button.addEventListener("click", function(event) {
//                 // Call the addToCart function passing the productId
//                 addToCart(productId, productTitle, productImg);
//             });
//         })
//         .catch(error => console.error("Error fetching product details:", error));
// }
//
//
//
// // Call getProductDetails function to fetch and display product details
// getProductDetails();
//
// const cart = [];
//
// function displayCart() {
//     // Clear previous cart content
//     console.log("Cart updated!"); // For demonstration purposes
//     const cartContainer = document.getElementById("render-cart-data");
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
//                 <button class="remove-from-cart-btn">Remove</button>
//             </div>
//         `;
//         cartContainer.appendChild(cartItem);
//     });
// }
//
// // Call removeFromCart function passing the productTitle when remove button is clicked
// const cartContainer = document.getElementById("render-cart-data");
// cartContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("remove-from-cart-btn")) {
//         const productTitle = event.target.dataset.productTitle;
//         removeFromCart(productTitle);
//     }
// });
//
// // Function to handle adding a product to the cart
// function addToCart(productTitle) {
//     // Fetch the product details using the productId
//     fetch(`https://api.noroff.dev/api/v1/rainy-days/${productTitle}`)
//         .then(response => response.json())
//         .then(productData => {
//             // Add the product data to the cart array
//             cart.push(productData);
//             console.log(`Product with ID ${productTitle} added to cart.`);
//             // Optionally, you can update the cart UI to display the added product
//             displayCart();
//         })
//         .catch(error => console.error("Error adding product to cart:", error));
// }
//
// productDetailsContainer.addEventListener("click", function (event) {
//     if (event.target.id === "add-to-cart-btn") {
//         const productTitle = event.target.dataset.productTitle;
//         addToCart(productTitle);
//     }
// });
//
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

// productDetailsContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("add-to-cart-btn")) {
//         const productId = event.target.dataset.productId;
//         addToCart(productId);
//     }
// });



// // tell js we want to add to a part of the html called <section id="product-card-container-single">
// const productDetailsContainer = document.getElementById("product-card-container-single");
//
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');
// const button = document.querySelector("#add-to-cart-btn");
//
//
// // const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/${productId}`;
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
//                     <button id="add-to-cart-btn">Add to Cart</button>
//                 </div>
//             `;
//         })
//         .catch(error => console.error("Error fetching product details:", error));
//
//     function addToCart(){
//
//     }
//     // Add event listener to the button
//     button.addEventListener("click", function(event) {
//         // Code to execute when the button is clicked
//         console.log("Button clicked!");
//     });
//
// }
//
// // Call getProductDetails function to fetch and display product details
// getProductDetails();
//
//
// // Function to handle adding a product to the cart
// function addToCart(productId) {
//     // Implement logic to add the product with the specified productId to the cart
//     console.log(`Product with ID ${productId} added to cart.`);
// }
//
// // Attach click event listeners to "Add to cart" buttons
// productDetailsContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("add-to-cart-btn")) {
//         const productId = event.target.dataset.productId;
//         addToCart(productId);
//     }
// });
//
// // Define a cart object to store added products
// const cart = [];
//
// // Function to add a product to the cart
// function addToCart(productId) {
//     // Find the product with the specified ID
//     const product = productsData.find(product => product.id === productId);
//     if (product) {
//         // Add the product to the cart
//         cart.push(product);
//         console.log(`Product with ID ${productId} added to cart.`);
//     } else {
//         console.error(`Product with ID ${productId} not found.`);
//     }
// }
//
// // Function to display the cart contents
// function displayCart() {
//     // Clear previous cart content
//     const cartContainer = document.getElementById("cart-container");
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
//                 <button class="remove-from-cart-btn" data-product-id="${product.id}">Remove</button>
//             </div>
//         `;
//         cartContainer.appendChild(cartItem);
//     });
// }
//
// // Function to remove a product from the cart
// function removeFromCart(productId) {
//     // Find the index of the product with the specified ID in the cart
//     const index = cart.findIndex(product => product.id === productId);
//     if (index !== -1) {
//         // Remove the product from the cart
//         cart.splice(index, 1);
//         console.log(`Product with ID ${productId} removed from cart.`);
//         // Update the displayed cart contents
//         displayCart();
//     } else {
//         console.error(`Product with ID ${productId} not found in cart.`);
//     }
// }
//
// // Attach click event listener to product container for adding products to the cart
// productDetailsContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("add-to-cart-btn")) {
//         const productId = event.target.dataset.productId;
//         addToCart(productId);
//     }
// });
//
// // Attach click event listener to cart container for removing products from the cart
// const cartContainer = document.getElementById("cart-container");
// cartContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("remove-from-cart-btn")) {
//         const productId = event.target.dataset.productId;
//         removeFromCart(productId);
//     }
// });















// let productCardSingle = document.getElementById("product-card-container-single");
//
// function getProduct() {
//     fetch("https://api.noroff.dev/api/v1/rainy-days")
//         .then(response => response.json())
//         .then(dataForProduct => {
//
//             productCardSingle.innerHTML = '';
//
//             const jacket = dataForProduct[0]; // Accessing the first jacket in the array
//
//             if (jacket.onSale) {
//                 productCardSingle.innerHTML += `
//                     <section class="prod-container">
//                         <div class="card">
//                             <img class="prod-image" src="${jacket.image}" alt="${jacket.title}">
//                             <h2 class="prod-title">${jacket.title}</h2>
//                             <p class="prod-description">${jacket.description}</p>
//                             <p class="prod-price-before">Price: ${jacket.price}</p>
//                             <p class="discount-price">Price: ${jacket.discountedPrice}</p>
//                             <button>lol</button>
//                         </div>
//                     </section>
//                 `;
//             } else {
//                 productCardSingle.innerHTML += `
//                     <section class="prod-container">
//                         <div class="card">
//                             <img class="prod-image" src="${jacket.image}" alt="${jacket.title}">
//                             <h2 class="prod-title">${jacket.title}</h2>
//                             <p class="prod-description">${jacket.description}</p>
//                             <p class="prod-price">Price: ${jacket.price}</p>
//                             <button>lol</button>
//                         </div>
//                     </section>
//                 `;
//             }
//
//         })
//         .catch(error => console.error("Error fetching data:", error));
// }
//
// getProduct();