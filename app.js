// GlobeJourneys Landing Page JavaScript
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Search form validation
    initSearchFormValidation();
    
    // Initialize Bootstrap carousel
    initCarousel();
    
    // Mobile navbar collapse functionality
    initMobileNavbarCollapse();
    
    // CTA "Book Now" button functionality
    initCTAButton();
    
    // Newsletter form handling
    initNewsletterForm();
    
    // Package booking buttons
    initPackageBooking();
    
    // Set minimum date for date inputs (today)
    setMinimumDates();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for fixed navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize search form validation
 */
function initSearchFormValidation() {
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form fields
            const destination = document.getElementById('destination');
            const dateFrom = document.getElementById('date-from');
            const dateTo = document.getElementById('date-to');
            const guests = document.getElementById('guests');
            
            // Get values
            const destinationValue = destination.value.trim();
            const dateFromValue = dateFrom.value;
            const dateToValue = dateTo.value;
            const guestsValue = guests.value;
            
            // Validate all fields are filled
            if (!destinationValue || !dateFromValue || !dateToValue || !guestsValue) {
                alert('Please fill in all fields to search for your perfect trip!');
                return;
            }
            
            // Validate date range
            const fromDate = new Date(dateFromValue);
            const toDate = new Date(dateToValue);
            
            if (fromDate >= toDate) {
                alert('Please ensure your departure date is before your return date.');
                return;
            }
            
            // Validate dates are in the future
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (fromDate < today) {
                alert('Please select a departure date that is today or in the future.');
                return;
            }
            
            // Success message
            alert(`Great choice! We're searching for trips to ${destinationValue} from ${dateFromValue} to ${dateToValue} for ${guestsValue} guest${guestsValue !== '1' ? 's' : ''}. Search feature coming soon!`);
        });
    }
}

/**
 * Initialize Bootstrap carousel
 */
function initCarousel() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    if (testimonialCarousel) {
        // Initialize carousel with auto-play
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000, // Auto-advance every 5 seconds
            ride: 'carousel',
            wrap: true
        });
    }
}

/**
 * Initialize mobile navbar collapse functionality
 */
function initMobileNavbarCollapse() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Close navbar when clicking on nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

/**
 * Initialize CTA "Book Now" button functionality
 */
function initCTAButton() {
    const ctaButton = document.getElementById('cta-book-now');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to search form
            const searchForm = document.getElementById('search-form');
            if (searchForm) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = searchForm.offsetTop - navbarHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on destination input after scrolling
                setTimeout(() => {
                    const destinationInput = document.getElementById('destination');
                    if (destinationInput) {
                        destinationInput.focus();
                    }
                }, 800);
            }
        });
    }
}

/**
 * Initialize newsletter form handling
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert(`Thank you for subscribing! We'll send exclusive travel deals and inspiration to ${email}.`);
            
            // Reset form
            emailInput.value = '';
        });
    }
}

/**
 * Initialize package booking buttons
 */
function initPackageBooking() {
    // Use event delegation to handle dynamically added buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-package')) {
            e.preventDefault();
            
            // Get package title from the card
            const packageCard = e.target.closest('.package-card');
            if (packageCard) {
                const packageTitle = packageCard.querySelector('.card-title').textContent;
                const packagePrice = packageCard.querySelector('.fs-4').textContent;
                
                // Show booking message
                alert(`You've selected the ${packageTitle} package for ${packagePrice}! Our booking system is coming soon. We'll contact you shortly to complete your reservation.`);
            }
        }
    });
}

/**
 * Set minimum dates for date inputs
 */
function setMinimumDates() {
    const dateFrom = document.getElementById('date-from');
    const dateTo = document.getElementById('date-to');
    
    if (dateFrom && dateTo) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateFrom.setAttribute('min', today);
        dateTo.setAttribute('min', today);
        
        // Update minimum date for "date to" when "date from" changes
        dateFrom.addEventListener('change', function() {
            dateTo.setAttribute('min', this.value);
            
            // Clear "date to" if it's before the new "date from"
            if (dateTo.value && dateTo.value < this.value) {
                dateTo.value = '';
            }
        });
    }
}

/**
 * Helper function to validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Add scroll effect to navbar (optional enhancement)
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Additional CSS for navbar scroll effect (injected via JS)
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background-color: rgba(13, 110, 253, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .navbar {
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Debug logging to help identify issues
console.log('GlobeJourneys JavaScript loaded successfully');

// Check if all required elements exist
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking elements...');
    console.log('Search form:', document.getElementById('search-form'));
    console.log('Newsletter form:', document.getElementById('newsletter-form'));
    console.log('Book buttons:', document.querySelectorAll('.book-package'));
    console.log('CTA button:', document.getElementById('cta-book-now'));
});