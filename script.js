const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const carousel = document.getElementById("carousel");

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

carousel.addEventListener("mouseover", stopAutoSlide);
carousel.addEventListener("mouseout", startAutoSlide);

showSlide(currentSlide);
startAutoSlide();

const menuIcon = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mainNav = document.getElementById("mainNav");
const registration = document.getElementById("registration");
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  mainNav.classList.toggle("radius");
  registration.classList.toggle("move");
});

const form = document.getElementById("registrationform");

form.addEventListener("submit", function (event) {
  let isValid = true;
  event.preventDefault();
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));

  const visitDate = document.getElementById("date-of-visit").value;
  if (visitDate === "") {
    document.getElementById("visitDateError").textContent =
      "Select your visit date.";
    isValid = false;
  }

  const numberOfVisitors = document.getElementById("no-of-visitors").value;
  if (numberOfVisitors === "") {
    document.getElementById("visitorsError").textContent =
      "Select the number of visitors.";
    isValid = false;
  }

  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    isValid = false;
  }

  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Enter a valid email.";
    isValid = false;
  }

  const dob = document.getElementById("dob").value;
  if (!dob) {
    document.getElementById("dobError").textContent = "Select your birth date.";
    isValid = false;
  }

  const genderOptions = document.querySelector('input[name="gender"]:checked');
  if (!genderOptions) {
    document.getElementById("genderError").textContent =
      "Please select your gender.";
    isValid = false;
  }

  const ticket = document.getElementById("ticket").value;
  if (ticket === "") {
    document.getElementById("ticketError").textContent =
      "Choose a ticket type.";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
  }
});

const cartList = [];
const cart = document.getElementById("cart");
const cartContent = document.getElementById("cartContent");

function displayProducts(productList) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  productList.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-card";
    productDiv.innerHTML = `
            <img src="assets/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
    productContainer.appendChild(productDiv);
    const addToCartButton = productDiv.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => addToCart(product.id));
  });
  
}

function addToCart(product_id) {
  const product = products.find(p => p.id === product_id);
  cartContent.innerHTML = "";
  if (cartList.length === 0) {
    product.quantity = 1;
    cartList.push(product);
  } else {
    const existingProduct = cartList.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cartList.push(product);
    }
  }

  console.log(cartList);

  cartList.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <img src="assets/${item.id}.jpg" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>
            <div class="quantity">Quantity: ${item.quantity}</div>
            <button class="remove-from-cart">Remove</button>
        `;
    cartContent.appendChild(cartItem);
    const removeFromCartButton = cartItem.querySelector(".remove-from-cart");
    removeFromCartButton.addEventListener("click", () => {
      cartContent.removeChild(cartItem);
      const index = cartList.indexOf(item);
      if (index > -1) {
        cartList.splice(index, 1);
      }
      if (cartList.length === 0) {
        cartContent.innerHTML = `<p class="default">Add anything you like</p>`;
      }
    });
  });

  const checkoutButtonHTML = document.createElement("div");
  checkoutButtonHTML.innerHTML = `
        <button class="check-out" id="checkoutButton">
            <span class="checkout-text">Checkout</span>
        </button>
    `;
  cartContent.appendChild(checkoutButtonHTML);
  const checkoutButtonNew = document.getElementById("checkoutButton");
  checkoutButtonNew.addEventListener("click", () => displayCheckout());
}

let products = null;
fetch("ghibli_merchandise.json")
  .then((response) => response.json())
  .then((jsArrayObjects) => {
    products = jsArrayObjects;
    displayProducts(products);

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
      const searchString = searchInput.value.trim();
      const searchResults = products.filter((product) =>
        product.name.includes(searchString)
      );
      displayProducts(searchResults);
    });
  });

let hideTimeout = null;
cart.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout);
  cartContent.classList.add("show");
});

cart.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    cartContent.classList.remove("show");
  }, 2000);
});

const checkoutContent = document.getElementById("checkoutContent");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutButtonGlobal = document.getElementById("checkoutButtonGlobal");
let total = 0;
let itemNumber = 0;
checkoutButton.addEventListener("click", () => displayCheckout());
checkoutButtonGlobal.addEventListener("click", () => displayCheckout());
checkoutButtonGlobal.addEventListener("click", () => {
  window.scrollTo(0, 600);
});
const yourCart = document.getElementById("yourCart");
const shopping = document.getElementById("shopping");
function displayCheckout() {
  if (cartList.length === 0) {
    return;
  }
  total = cartList.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);
  itemNumber = cartList.reduce((sum, product) => {
    return sum + product.quantity;
  }, 0);
  console.log(total);
  checkoutContent.innerHTML = cartList
  .map((product) => {
    return `
      <div>
        <div class="check-out-item">
          <h3>${product.name}</h3>
          <p>--Price: $${product.price}</p>
          <p class="quantity">Quantity: ${product.quantity}</p>
        </div>
        <span class="line"></span>
      </div>
    `;
  })
  .join("");
  cartList.length = 0;
  cartContent.innerHTML = `<p class="default">Add anything you like</p>`;
  cartContent.classList.remove("show");
  yourCart.classList.add("show");
  shopping.classList.remove("show");
  checkoutButtonGlobal.classList.add("close");
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 800) {
    checkoutButtonGlobal.classList.add("showBlock");
  } else {
    checkoutButtonGlobal.classList.remove("showBlock");
  }
});
const infor = document.getElementById("personalInfo");
const buybutton = document.getElementById("buyButton");
buybutton.addEventListener("click", () => {
  infor.classList.add("show");
  yourCart.classList.remove("show");
});

const inforButton = document.getElementById("inforButton");

const inforForm = document.getElementById("personalInfoForm");
const confirmContent = document.getElementById("confirmContent");
const confirm = document.getElementById("confirm");
const myModal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");
let personalInfo = {};
let timeoutForModal = null;
inforForm.addEventListener("submit", function (event) {
  let isValid = true;
  event.preventDefault();
  document
  .querySelectorAll(".error")
  .forEach((error) => (error.textContent = ""));

  const name = document.getElementById("inforName").value.trim();
  if (name === "") {
    document.getElementById("inforNameError").textContent = "Name is required.";
    isValid = false;
  }
  personalInfo.name = name;

  const email = document.getElementById("inforEmail").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("inforEmailError").textContent = "Enter a valid email.";
    isValid = false;
  }
  personalInfo.email = email;

  const address = document.getElementById("inforAddress").value.trim();
  if (address === "") {
    document.getElementById("inforAddressError").textContent = "Address is required.";
    isValid = false;
  }
  personalInfo.address = address;

  const paymentMethod = document.getElementById("paymentMethod").value;
  if (paymentMethod=== "") {
    document.getElementById("paymentMethodError").textContent =
      "Please select a payment method.";
    isValid = false;
  }
  personalInfo.paymentMethod = paymentMethod;

  const cardNumber = document.getElementById("cardNumber").value.trim();
  if (cardNumber=== "") {
    document.getElementById("cardNumberError").textContent = "Enter a valid card number.";
    isValid = false;
  }
  personalInfo.cardNumber = cardNumber;

  const expirationDate = document.getElementById("expiryDate").value;
  if (!expirationDate) {
    document.getElementById("expiryDateError").textContent = "Enter a valid expiration date.";
    isValid = false;
  }
  personalInfo.expirationDate = expirationDate;

  const cvv = document.getElementById("cvv").value.trim();
  if (cvv === "") {
    document.getElementById("cvvError").textContent = "Enter a valid CVV.";
    isValid = false;
  }
  personalInfo.cvv = cvv;

  if (isValid) {
    myModal.classList.add("show");
    closeModal.addEventListener("click", () => {
      myModal.classList.remove("show");
      clearTimeout(timeoutForModal);
    }); 
    timeoutForModal = setTimeout(() => {
      myModal.classList.remove("show");
    }, 2000);

    console.log(personalInfo);
  }
  const confirmInfor = document.createElement("div");
  confirmInfor.className = "confirm-infor";
  confirmInfor.innerHTML = `
            <p>Thank you,<span>  ${personalInfo.name}<span></p>
            <P>Your order of <span>${itemNumber}</span> items totaling <span>$${total}</span> will be delivered to:</P>
            <p>Address: ${personalInfo.address}</p>
            <p>Expect your package in 3-4 working days.</p>
        `;
  confirmContent.appendChild(confirmInfor);  
  confirm.classList.add("show");
  infor.classList.remove("show");
 
});

const backToShopping = document.getElementById("backToShopping");
backToShopping.addEventListener("click", () => {
  confirm.classList.remove("show");
  shopping.classList.add("show");
  total = 0;
  itemNumber = 0;
  cartList.length = 0;
  personalInfo = {};
  checkoutContent.innerHTML = "";
  confirmContent.innerHTML = "";
  inforForm.reset();
  inforForm.scrollTop = 0;
  checkoutButtonGlobal.classList.remove("close");
});
