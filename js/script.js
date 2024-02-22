let productContainer = document.getElementById("product-container");
const buttonsFiltering = document.querySelectorAll(".filterbtn");

async function getAllProducts() {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        const productsData = await response.json();
        productContainer.innerHTML = '';
        productsData.forEach(product => {
            const productCard = `
                    <section class="prod-container">
                        <div class="card">
                        <a href="product.html?id=${product.id}" class="prod-link">
                            <img class="prod-image" src="${product.image}" alt="${product.title}">
                            <h2 class="prod-title">${product.title}</h2>
                            <p class="prod-description">${product.description}</p>
                            <p class="prod-price">Price: ${product.price}</p>
                            <button>View Details</button>
                        </a>    
                        </div>
                    </section>
            `;
            productContainer.innerHTML += productCard;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function filterProds(filterValue) {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        const productsData = await response.json();
        productContainer.innerHTML = '';
        productsData.forEach(product => {
            if ((product.onSale && product.gender.toLowerCase() === filterValue) ||
                (!product.onSale && product.gender.toLowerCase() === filterValue)) {
                const productCard = `
                    <a href="product.html?id=${product.id}" class="prod-link">
                        <section class="prod-container">
                            <div class="card">
                                <img class="prod-image" src="${product.image}" alt="${product.title}">
                                <h2 class="prod-title">${product.title}</h2>
                                <p class="prod-description">${product.description}</p>
                                <p class="prod-price">Price: ${product.price}</p>
                                <button>View Details</button>
                            </div>
                        </section>
                    </a>
                `;
                productContainer.innerHTML += productCard;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

buttonsFiltering.forEach(button => {
    button.addEventListener("click", async function () {
        let filterBtnValue = this.dataset.filter;
        if (filterBtnValue === "showall") {
            await getAllProducts();
        } else {
            await filterProds(filterBtnValue);
        }
    });
});

getAllProducts();