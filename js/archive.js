// Get important elements from the page
const cartButton = document.getElementById("cartButton");
// Button that opens the cart

const checkout = document.getElementById("checkout");
// Checkout modal window (popup)

const closeCheckoutButton = document.getElementById("closeCheckout");
// Button that closes the checkout popup

const itemName = document.getElementById("itemName");
// Area where selected product name is shown

const itemPrice = document.getElementById("itemPrice");
// Area where selected product price is shown

const cursor = document.getElementById("cursor");
// Custom cursor element

const buyButtons = document.querySelectorAll("button[data-name][data-price]");
// Selects all buttons that have product name and price


// Cart state variables
let cartCount = 0;
// Stores how many items are in cart

let lastFocusedElement = null;
// Saves last focused element for accessibility


/* ======================================================
   SMOOTH SCROLL (Lenis library)
   Runs only if Lenis exists
====================================================== */
if (typeof Lenis !== "undefined") {
  const lenis = new Lenis();

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}


/* ======================================================
   CUSTOM CURSOR MOVEMENT
   Only runs on devices that support hover (desktop)
====================================================== */
if (window.matchMedia("(hover: hover)").matches && cursor) {
  document.addEventListener("mousemove", (event) => {
    // Moves the custom cursor to mouse position
    cursor.style.transform = `translate(${event.clientX - 20}px, ${event.clientY - 20}px)`;
  });
}


/* ======================================================
   UPDATE CART BUTTON TEXT
   Example: Cart (3)
====================================================== */
function updateCartLabel() {
  cartButton.textContent = `Cart (${cartCount})`;
}


/* ======================================================
   OPEN CHECKOUT POPUP
   Shows selected item info
====================================================== */
function openCheckout(name, price) {
  itemName.textContent = name;

  // If price is a number → format with €
  itemPrice.textContent = typeof price === "number" ? `${price}€` : String(price);

  checkout.classList.remove("hidden");
  checkout.classList.add("flex");
  // Makes popup visible

  checkout.setAttribute("aria-hidden", "false");
  // Accessibility: screen readers know popup is visible

  document.body.classList.add("checkout-open");
  // Prevents background scrolling

  lastFocusedElement = document.activeElement;
  // Save focus to restore later

  closeCheckoutButton.focus();
  // Focus close button for keyboard users
}


/* ======================================================
   CLOSE CHECKOUT POPUP
====================================================== */
function closeCheckout() {
  checkout.classList.add("hidden");
  checkout.classList.remove("flex");
  // Hides popup

  checkout.setAttribute("aria-hidden", "true");
  // Accessibility update

  document.body.classList.remove("checkout-open");
  // Re-enable page scroll

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    // Restore previous focus
  }
}


/* ======================================================
   BUY BUTTON CLICK HANDLER
   Adds item to cart and opens checkout
====================================================== */
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    // Gets product name from HTML

    const price = Number(button.dataset.price);
    // Gets price and converts to number

    cartCount += 1;
    // Increase cart counter

    updateCartLabel();
    // Update button label

    openCheckout(name, price);
    // Open checkout popup
  });
});


/* ======================================================
   CART BUTTON CLICK
   Opens checkout with generic info
====================================================== */
cartButton.addEventListener("click", () => {
  openCheckout("Panier", "Voir total");
});


/* ======================================================
   CLOSE BUTTON CLICK
====================================================== */
closeCheckoutButton.addEventListener("click", closeCheckout);


/* ======================================================
   CLICK OUTSIDE POPUP TO CLOSE
====================================================== */
checkout.addEventListener("click", (event) => {
  if (event.target === checkout) {
    closeCheckout();
  }
});


/* ======================================================
   ESC KEY CLOSES POPUP
====================================================== */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !checkout.classList.contains("hidden")) {
    closeCheckout();
  }
});
