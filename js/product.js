const productDetailsContainer = document.getElementById("product-card-container-single");
const cartContainer = document.getElementById("render-cart-data");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let cart = [];
const loading = document.getElementById("loading-animation");

function getProductDetails() {
    loading.style.display = "block";

    fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
        .then(response => response.json())
        .then(productData => {

            productDetailsContainer.innerHTML = `
                <div class="product-detail">
                    <img class="prod-image" src="${productData.image}" alt="${productData.title}">
                    <h2 class="prod-title">${productData.title}</h2>
                    <p class="prod-description">${productData.description}</p>
                    <p class="prod-price">Price: ${productData.price}</p>
                    <label for="sizes">Choose your size:</label>
                    <select id="sizes" name="sizes"></select>
                    <button class="add-to-cart-btn" 
                    data-product-id="${productData.id}" data-product-title="${productData.title}" 
                    data-product-img="${productData.image}" 
                    data-product-price="${productData.price}">Add to Cart</button>
                </div>
            `;

            const sizesDropdown = document.getElementById("sizes");
            productData.sizes.forEach(size => {
                const option = document.createElement("option");
                option.text = size;
                option.value = size;
                sizesDropdown.appendChild(option);
            });

            const button = document.querySelector(".add-to-cart-btn");
            button.addEventListener("click", function(event) {
                const productId = event.target.dataset.productId;
                const productTitle = event.target.dataset.productTitle;
                const productImg = event.target.dataset.productImg;
                const productPrice = event.target.dataset.productPrice;
                const selectedSize = document.getElementById("sizes").value;
                addToCart(productId, productTitle, productImg, productPrice, selectedSize);
            });
            loading.style.display = "none";
        })
        .catch(error => {
            loading.style.display = "none";
            alert("Ops! We could not load the products. Please check your internet access or try again later.");
        });
}

getProductDetails();

function addToCart(productId, productTitle, productImg, productPrice, selectedSize) {
    if (!productId || !productTitle || !productImg || !productPrice) {
        alert("Ops! Something went wrong. Please try again later.");
        return;
    }

    const product = {
        id: productId,
        title: productTitle,
        image: productImg,
        price: productPrice,
        size: selectedSize
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
                <p>Size: ${product.size}</p>
                <p>${product.price}</p>
                <button class="remove-from-cart-btn" data-product-title="${product.title}">x</button>
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
