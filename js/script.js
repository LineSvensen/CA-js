let productContainer = document.getElementById("product-container");
const buttonsFiltering = document.querySelectorAll(".filterbtn");

buttonsFiltering.forEach(button => {button.addEventListener("click", function(){
    let filterBtnValue = this.dataset.filter; //
    if (filterBtnValue === "showall") {
        getAllProducts();
    } else {
        filterProds(filterBtnValue)
    }
})})

function getAllProducts () {
    fetch("https://api.noroff.dev/api/v1/rainy-days")
        .then(response => response.json())
        .then(productsData => {

            productContainer.innerHTML = '';

            productsData.forEach(product => {

                if (product.onSale) {
                    productContainer.innerHTML += `
                <section class="prod-container">
                    <div class="card">
                        <img class="prod-image" src="${product.image}" alt="${product.title}">
                        <h2 class="prod-title">${product.title}</h2>
                        <p class="prod-description">${product.description}</p>
                        <p class="prod-price-before">Price: ${product.price}</p>
                        <p class="discount-price">Price: ${product.discountedPrice}</p>
                        <button>lol</button>
                    </div>    
                </section>
            `;
                } else {
                    productContainer.innerHTML += `
                <section class="prod-container">
                    <div class="card">
                        <img class="prod-image" src="${product.image}" alt="${product.title}">
                        <h2 class="prod-title">${product.title}</h2>
                        <p class="prod-description">${product.description}</p>
                        <p class="prod-price">Price: ${product.price}</p>
                        <button>lol</button>
                    </div>
                </section>
            `;
                }
            });

        })
        .catch(error => console.error("Error fetching data:", error));
}

getAllProducts();

function filterProds (filterValue)
{
    fetch("https://api.noroff.dev/api/v1/rainy-days")
        .then(response => response.json())
        .then(productsData => {

            productContainer.innerHTML = '';

            productsData.forEach(product => {

                if (product.onSale && product.gender.toLowerCase() === filterValue) {
                    productContainer.innerHTML += `
                <section class="prod-container">
                    <div class="card">
                        <img class="prod-image" src="${product.image}" alt="${product.title}">
                        <h2 class="prod-title">${product.title}</h2>
                        <p class="prod-description">${product.description}</p>
                        <p class="prod-price-before">Price: ${product.price}</p>
                        <p class="discount-price">Price: ${product.discountedPrice}</p>
                        <button>lol</button>
                    </div>    
                </section>
            `;
                } else if (product.onSale === false && product.gender.toLowerCase() === filterValue){
                    productContainer.innerHTML += `
                <section class="prod-container">
                    <div class="card">
                        <img class="prod-image" src="${product.image}" alt="${product.title}">
                        <h2 class="prod-title">${product.title}</h2>
                        <p class="prod-description">${product.description}</p>
                        <p class="prod-price">Price: ${product.price}</p>
                        <button>lol</button>
                    </div>
                </section>
            `;
                }
            });

        })
        .catch(error => console.error("Error fetching data:", error));
}