function getOrderFromLocalStorage() {
    const storedOrder = localStorage.getItem("cart");
    if (storedOrder) {
        return JSON.parse(storedOrder);
    } else {
        return [];
    }
}

function displayCartOnConfirmationPage() {
    const cart = getOrderFromLocalStorage();
    const receiptContainer = document.getElementById("receipt");
    const totalValuePaid = document.getElementById("total-value-paid");

    receiptContainer.innerHTML = '';

    let totalValue = 0;

    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <p>Size: ${product.size}</p>
                <p>${product.price}</p>
            </div>
        `;
        receiptContainer.appendChild(cartItem);

        totalValue += parseFloat(product.price);
    });

    totalValuePaid.textContent = `Total Value: $${totalValue.toFixed(2)}`;
}

window.addEventListener("load", function() {
    displayCartOnConfirmationPage();
});

window.addEventListener("beforeunload", function() {
    if (window.location.pathname.includes("confirmation.html")) {
        localStorage.removeItem("cart");
    }
});