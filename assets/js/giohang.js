document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    let total = 0;
  
    function addToCart(itemName, itemPrice) {
      const listItem = document.createElement("li");
      listItem.textContent = `${itemName} - $${itemPrice}`;
      cartItems.appendChild(listItem);
      total += parseFloat(itemPrice);
      totalPrice.textContent = `$${total.toFixed(2)}`;
    }
  
    // Example: Adding items to the cart
    addToCart("Product 1", 10.99);
    addToCart("Product 2", 5.99);
  });
  