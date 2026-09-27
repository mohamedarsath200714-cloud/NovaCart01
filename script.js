/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: 1,
        name: "Echo Buds X",
        category: "tech",
        price: 1999,
        rating: 4.8,
        icon: "🎧"
    },

    {
        id: 2,
        name: "Pulse Smart Band",
        category: "tech",
        price: 2499,
        rating: 4.7,
        icon: "⌚"
    },

    {
        id: 3,
        name: "Canvas Travel Bag",
        category: "style",
        price: 1599,
        rating: 4.6,
        icon: "👜"
    },

    {
        id: 4,
        name: "Street Runner",
        category: "style",
        price: 2999,
        rating: 4.9,
        icon: "👟"
    },

    {
        id: 5,
        name: "Aura Table Lamp",
        category: "home",
        price: 1399,
        rating: 4.5,
        icon: "💡"
    },

    {
        id: 6,
        name: "Mini Sound Box",
        category: "tech",
        price: 2299,
        rating: 4.8,
        icon: "🔊"
    },

    {
        id: 7,
        name: "Cloud Cushion",
        category: "home",
        price: 899,
        rating: 4.4,
        icon: "🛋️"
    },

    {
        id: 8,
        name: "Urban Bottle",
        category: "home",
        price: 749,
        rating: 4.6,
        icon: "🥤"
    }

];


/* =========================
   STATE
========================= */

let currentCategory = "all";

let cart = [];


/* =========================
   ELEMENTS
========================= */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const cartBtn =
    document.getElementById("cartBtn");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered = products.filter(product => {

        const categoryMatch =
            currentCategory === "all" ||
            product.category === currentCategory;


        const searchMatch =
            product.name
                .toLowerCase()
                .includes(searchTerm);


        return categoryMatch && searchMatch;

    });


    /* SORT */

    if (sortSelect.value === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortSelect.value === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortSelect.value === "rating") {

        filtered.sort(
            (a, b) => b.rating - a.rating
        );

    }


    productGrid.innerHTML = "";


    /* CREATE CARDS */

    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <button
                class="wishlist"
                type="button"
                aria-label="Add ${product.name} to wishlist"
                aria-pressed="false"
                onclick="toggleWishlist(this)"
            >
                ♡
            </button>


            <div
                class="product-image"
                aria-hidden="true"
            >
                ${product.icon}
            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div
                    class="rating"
                    aria-label="Rating ${product.rating} out of 5"
                >
                    ★ ${product.rating}
                </div>


                <div class="price-row">

                    <span class="price">
                        ₹${product.price.toLocaleString()}
                    </span>


                    <button
                        class="add-btn"
                        type="button"
                        aria-label="Add ${product.name} to cart"
                        onclick="addToCart(${product.id})"
                    >
                        +
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(card);

    });


    productCount.textContent =
        `${filtered.length} items`;


    noProducts.classList.toggle(
        "hidden",
        filtered.length !== 0
    );

}


/* =========================
   CATEGORY
========================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                        btn.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });


                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );


                currentCategory =
                    button.dataset.category;


                displayProducts();

            }
        );

    });


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    displayProducts
);


/* =========================
   SORT
========================= */

sortSelect.addEventListener(
    "change",
    displayProducts
);


/* =========================
   WISHLIST
========================= */

function toggleWishlist(button) {

    const selected =
        button.getAttribute(
            "aria-pressed"
        ) === "true";


    if (!selected) {

        button.textContent = "♥";

        button.style.color = "#ff6688";

        button.setAttribute(
            "aria-pressed",
            "true"
        );

        button.setAttribute(
            "aria-label",
            "Remove from wishlist"
        );

    } else {

        button.textContent = "♡";

        button.style.color = "";

        button.setAttribute(
            "aria-pressed",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Add to wishlist"
        );

    }

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    cart.push(product);

    updateCart();

    openCart();

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartCount.textContent =
        cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        cartTotal.textContent =
            "₹0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        item.innerHTML = `

            <div
                class="cart-item-image"
                aria-hidden="true"
            >
                ${product.icon}
            </div>


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString()}
                </p>

            </div>


            <button
                class="remove-item"
                type="button"
                aria-label="Remove ${product.name}"
                onclick="removeFromCart(${index})"
            >
                ×
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `₹${total.toLocaleString()}`;

}


/* =========================
   REMOVE
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("show");

    cartPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================
   CLOSE CART
========================= */

function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("show");

    cartPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


cartBtn.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


overlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            cartPanel.classList.contains("open")
        ) {

            closeCartPanel();

        }

    }
);


/* =========================
   INITIAL LOAD
========================= */

displayProducts();

updateCart();