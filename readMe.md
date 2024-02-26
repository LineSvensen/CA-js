# CA JavaScript - Rainy Days online store

## Welcome! This repo contains the code for the "Rainy Days" online store, where i was tasked with using JavaScript and fetching API. On this website you can view all products, filter by gender, add products to cart, checkout and finally get order confirmation. This CA is a part of my Front-end development education at Noroff School of Technology and Digital Media. View the website here: https://ca-js.vercel.app/ .

### Programs used 🛠️
- Webstorm (HTML, CSS)
- Sourcetree (push project to Github)
- Vercel (deploy webpage)

### Project structure 📂
- Assets folder contain logo image (and product images, just for referance).
- All CSS are in the CSS folder.
- All JS are in the JS folder.

### Features 🌟

The webpage consists of 4 pages in total; Homepage, product-page, checkout and confirmation-page. This is a very basic and simple website with the purpose to demonstrate some of my skills regarding JS and fetching API.

#### Home-page:
- Scroll down to see different products
- Buttons filter between gender: Show All, Female, Male.
- Very simple nav-bar with the cart icon that takes you to cart/checkout

#### Product-page:
- Depending on loading time, a loader will show up when you enter the page
- Shows more details about the product (description, size etc)
- You can chose any size listed in dropdown
- You can add item to cart with your chosen size
- The cart will show up below on the page, displaying products added to cart. You can press X to remove items.
- Cart icon in nav-bar will take you to cart/checkout

#### Cart/checkout-page:
- Items added to cart will be displayed here
- Each product will show title, size and price
- Each product can be removed when pressing the remove-buttons
- Total value of items will be displayed below
- Checkout button will take you to confirmation-page
- If you have zero items in cart, you will get an alert window saying you cant continue with any products in cart

#### Confirmation-page:
- Depending on loading time, a loader will show up when you enter the page
- You will see a thank you message
- Products "bought" will be displayed with title, size and price
- Total value will show
- When leaving the page, the cart will empty itself

## Reflection note:

Working with this CA, I have gotten much more familiar with using javascript. This is also my first project fetching API.

Starting out, it was a challenge deciding what way I wanted to structure my code (since there’s so many different ways to do it in JS). One thing I decided on was to not “create elements” in JavaScript. Although there were some elements created, I mainly used inner HTML to create div’s. The reason for this was that it’s easier to edit – and at the same time shortens down the code. The negative part is of course that its less organized, less secure and easier to write mistakes/bugs.

Since this was my first time actually fetching API, it was tricky at first to visualize the webpage without no actual products to display from my Html – and knowing that it was crucial to make the fetch work (or else there would be no products). I wanted to make the website as simple as possible with less focus on design. It was important to make the website smooth with no hidden bugs. I used Google, W3schools and Youtube to help me along the way.

After this CA, I can now manage and understand the logic behind fetching API and how to use local storage to save and display items added to cart on different pages. Tough it was a challenging process, I’m now more confident in how to filter products from the API. Additionally, I have learned that you really must be specific in your code: two jackets are not the same even though they have the same name and image (this was the reason why more products were added or removed to cart at the same time). I now understand the importance of giving functions different responsibility and separating them, in order for no overlapping and confusion.

Link to vercel: https://ca-js.vercel.app/

Feel free to contact me if you have questions or are interested in my work 😃

BR, Line