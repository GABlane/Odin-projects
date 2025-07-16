import "./styles.css";
import { home } from "./content/home";
import { menu } from "./content/menu";
import { contact } from "./content/contact";
import { footer } from "./content/footer";

// Get DOM elements
const content = document.getElementById("content");
const foot = document.getElementById("footer");
const homeBtn = document.getElementById("home");
const menuBtn = document.getElementById("menu");
const contactBtn = document.getElementById("contact");

// Function to update content
function showPage(pageContent) {
    content.innerHTML = pageContent;
}

// Function to update active button styling
function setActiveButton(activeBtn) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    activeBtn.classList.add('active');
}

// Add event listeners to buttons
homeBtn.addEventListener('click', () => {
    showPage(home);
    setActiveButton(homeBtn);
});

menuBtn.addEventListener('click', () => {
    showPage(menu);
    setActiveButton(menuBtn);
});

contactBtn.addEventListener('click', () => {
    showPage(contact);
    setActiveButton(contactBtn);
});

foot.innerHTML = footer; 


// Load home page by default
showPage(home);
setActiveButton(homeBtn);