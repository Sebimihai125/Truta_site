const carouselSlide = document.querySelector('.carousel_slide');
const carouselImages = document.querySelectorAll('.carousel_slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 1;
const size = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Button Listeners
nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = 1;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});
let autoSlide = setInterval(() => {
    nextBtn.click();
}, 3000);
 
// Reset the interval after a click
nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 3000);
});
 
prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 3000);
});
 
carouselSlide.addEventListener('mouseover', () => {
    clearInterval(autoSlide);
});
 
carouselSlide.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 1000);
});

//not in use for now
const cart_display = document.querySelector('.cart_number_container');
const counter_display = document.querySelector('.cart_number');
const dropdown = document.querySelector('.dropdown_content');
let cart = [];
 
document.querySelector('.cart_number_container').addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});
 
function addToCart(productId) {
    let product = document.getElementById(productId);
    cart.push(product);
    counter_display.innerText = cart.length;
    updateDropdown();
}
 
let buttons = document.getElementsByClassName('comn_button');
 
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        addToCart(this.dataset.productId);
    });
}
 
function updateDropdown(){
    let dropdownList = dropdown.querySelector('ul');
    dropdownList.innerHTML = '';
 
    cart.forEach(product => {
 
        let listItem = document.createElement('li');
        // Combine the name and price into one string
        listItem.innerText = `${product.querySelector('.comn_name').innerText}
        ${product.querySelector('.comn_price').innerText}`;
        dropdownList.appendChild(listItem);
    });
}