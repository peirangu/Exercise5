const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carousel = document.getElementById('carousel');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide=> slide.classList.remove("active"));
    slides[index].classList.add("active")
}

function nextSlide() {
    currentSlide = (currentSlide + 1)% slides.length;
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

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

carousel.addEventListener('mouseover', stopAutoSlide);
carousel.addEventListener('mouseout', startAutoSlide);

showSlide(currentSlide);
startAutoSlide();






const menuIcon = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const mainNav = document.getElementById('mainNav');
const registration = document.getElementById('registration');
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle("show");
    mainNav.classList.toggle("radius");
    registration.classList.toggle("move");
});





const form = document.getElementById('registrationform');
    
form.addEventListener('submit', function(event) {
    let isValid = true;
    event.preventDefault();
    document.querySelectorAll('.error').forEach(error => error.textContent="");

    const visitDate = document.getElementById("date-of-visit").value;
    if (visitDate === "") {
        document.getElementById("visitDateError").textContent = "Select your visit date.";
        isValid = false;
    }

    const numberOfVisitors = document.getElementById("no-of-visitors").value;
    if (numberOfVisitors === "") {
        document.getElementById("visitorsError").textContent = "Select the number of visitors.";
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
        document.getElementById("genderError").textContent = "Please select your gender.";
        isValid = false;
    }

    const ticket = document.getElementById("ticket").value;
    if (ticket === "") {
        document.getElementById("ticketError").textContent = "Choose a ticket type.";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
    }
       
});

function displayProducts(productList){
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = "";

    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <img src="assets/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });

}

let products =null;
fetch('ghibli_merchandise.json')
    .then(response => response.json())
    .then(jsArrayObjects=> {
        products = jsArrayObjects;
        displayProducts(products);

        const searchInput = document.getElementById("search");
        searchInput.addEventListener("input", () => {
            const searchString = searchInput.value.trim();
            const searchResults = products.filter(product => product.name.includes(searchString));
            displayProducts(searchResults);
        });
});

   