// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// Feature cards animation on scroll
const featureCards = document.querySelectorAll('.feature-card');
const newsCards = document.querySelectorAll('.news-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add initial styles and observe feature cards
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add initial styles and observe news cards
newsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Create images directory and placeholder for required images
const createImagesDirectory = () => {
    // Note: This is just a reminder that you need to create an 'images' directory
    // and add the following images:
    // - jember-hero.jpg (hero background)
    // - jfc.jpg (Jember Fashion Carnaval)
    // - papuma.jpg (Pantai Papuma)
    // - tembakau.jpg (Tembakau)
    // - news1.jpg (News image 1)
    // - news2.jpg (News image 2)
}; 