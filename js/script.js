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


fetch("https://api.noroff.dev/api/v1/rainy-days")
    .then(response => response.json())
    .then(productsData => {

        productsData.forEach(product => {

            const productContainer = document.createElement("section");
            const titleForProduct = document.createElement("h2");
            const productDescription = document.createElement("p");
            const productPrice = document.createElement("p");
            const productImage = document.createElement("img");

            titleForProduct.textContent = product.title;
            productDescription.textContent = product.description;
            productPrice.textContent = `Price: ${product.price}`;
            productImage.src = product.image;
            productImage.alt = product.title;

            productContainer.appendChild(titleForProduct);
            productContainer.appendChild(productDescription);
            productContainer.appendChild(productPrice);
            productContainer.appendChild(productImage);

            document.body.appendChild(productContainer);

        });
    })
    .catch(error => console.error("Error fetching data:", error));