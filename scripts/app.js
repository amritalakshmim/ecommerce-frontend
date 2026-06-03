console.log("E-Commerce Website Loaded");

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".nav-menu");

hamburgerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const productGrid = document.getElementById("product-grid");

function displayProducts(products) {

  productGrid.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        loading="lazy"
      >

      <h3>${product.title}</h3>

      <p class="price">
        $${product.price}
      </p>

      <p class="description">
        ${product.description}
      </p>

      <button class="add-to-cart">
        Add to Cart
      </button>
    `;

    productGrid.appendChild(card);
  });
}

productGrid.innerHTML = 
  "<p class='loading-message'>Loading products...</p>";

const cachedProducts = localStorage.getItem("products");

if (cachedProducts) {

  displayProducts(JSON.parse(cachedProducts));

} else {

  productGrid.innerHTML =
    "<p class='loading-message'>Loading products...</p>";

  fetch("https://dummyjson.com/products/category/beauty")

  .then(response => {

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  })

  .then(data => {

    localStorage.setItem(
      "products",
      JSON.stringify(data.products)
    );

    displayProducts(data.products);

  })

  .catch(error => {

    console.error("Error fetching products:", error);

    productGrid.innerHTML = `
      <div class="error-message">
        Failed to load products. 
        Please try again later.
        </div>
        `;
  });
}

document.addEventListener("click", (event) => {

  if (event.target.classList.contains("add-to-cart")) {

    alert("Product added to cart!");
  }

});