// const productsInMain = document.getElementById("main");
// let productsData = []

//
// fetch("https://api.noroff.dev/api/v1/rainy-days")
//     .then((response) => response.json())
//     .then((productsResultData) => {
//         productsData = productsResultData;
//         for (const product of productsData) {
//
//         }
//     })
//     .catch(error => console.error("Error fetching data:", error));
//
// console.log(productsData);

let productContainer = document.getElementById("product-container");

fetch("https://api.noroff.dev/api/v1/rainy-days")
    .then(response => response.json())
    .then(productsData => {

        productContainer.innerHTML = '';

        productsData.forEach(product => {

            if (product.onSale) {
                productContainer.innerHTML += `
                <section class="prod-container">
                    <img class="prod-image" src="${product.image}" alt="${product.title}">
                    <h2 class="prod-title">${product.title}</h2>
                    <p class="prod-description">${product.description}</p>
                    <p class="prod-price-before">Price: ${product.price}</p>
                    <p class="discount-price">Price: ${product.discountedPrice}</p>
                    <button>lol</button>
                </section>
            `;
            } else {
                productContainer.innerHTML += `
                <section class="prod-container">
                    <img class="prod-image" src="${product.image}" alt="${product.title}">
                    <h2 class="prod-title">${product.title}</h2>
                    <p class="prod-description">${product.description}</p>
                    <p class="prod-price">Price: ${product.price}</p>
                    <button>lol</button>
                </section>
            `;
            }
        });

    })
    .catch(error => console.error("Error fetching data:", error));