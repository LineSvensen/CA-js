const productDetailsContainer = document.getElementById("product-card-container-single");
const cartContainer = document.getElementById("render-cart-data");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productTitle = urlParams.get("title");
const productImg = urlParams.get("image");
const productPr = urlParams.get("price");

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

            const button = document.querySelector(".add-to-cart-btn");
            button.addEventListener("click", function(event) {
                const productId = event.target.dataset.productId;
                const productTitle = event.target.dataset.productTitle;
                const productImg = event.target.dataset.productImg;
                const productPrice = event.target.dataset.productPrice;
                addToCart(productId, productTitle, productImg, productPrice);
            });
        })
        .catch(error => console.error("Error fetching product details:", error));
}

getProductDetails();

let cart = [];

function addToCart(productId, productTitle, productImg, productPrice) {
    if (!productId || !productTitle || !productImg || !productPrice) {
        console.error("Invalid product data provided.");
        return;
    }

    const product = {
        id: productId,
        title: productTitle,
        image: productImg,
        price: productPrice
    };

    cart.push(product);

    displayCart();

    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {

    cartContainer.innerHTML = '';

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

cartContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const productTitle = event.target.dataset.productTitle;
        removeFromCart(productTitle);
    }
});

function removeFromCart(productTitle) {
    const index = cart.findIndex(product => product.title === productTitle);
    if (index !== -1) {
        cart.splice(index, 1);
        displayCart();
        saveCartToLocalStorage();
    } else {
        alert("Ops! Something went wong.");
    }
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displayCart();
    }
}

window.addEventListener("load", loadCartFromLocalStorage);