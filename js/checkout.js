function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        return JSON.parse(storedCart);
    } else {
        return [];
    }
}

function displayCartOnConfirmationPage() {
    const cart = getCartFromLocalStorage();
    const cartContainer = document.getElementById("cart-container");
    const totalValueElement = document.getElementById("total-value");

    cartContainer.innerHTML = '';

    let totalValue = 0;

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

        totalValue += parseFloat(product.price);
    });

    totalValueElement.textContent = `Total Value: $${totalValue.toFixed(2)}`;

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            const productIndex = parseInt(event.target.dataset.productIndex);
            if (!event.target.disabled) {
                event.target.disabled = true;
                removeFromCart(productIndex);
            }
        }
    });
}

function removeFromCart(productIndex) {
    const cart = getCartFromLocalStorage();
    if (productIndex >= 0 && productIndex < cart.length) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartOnConfirmationPage();
    } else {
        console.error(`Invalid product index: ${productIndex}`);
    }
}

window.addEventListener("load", function() {
    displayCartOnConfirmationPage();
});

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", function() {
    const cart = getCartFromLocalStorage();

    if (cart.length > 0) {
        const loadingAnimation = document.getElementById("loading-animation");
        loadingAnimation.style.display = "block";

        setTimeout(function () {
            loadingAnimation.style.display = "none";
            window.location.href = "confirmation.html";
        }, 1000);
    } else {
        alert("There's nothing to checkout. You have no products in your cart :( ");
        event.preventDefault();
    }
});