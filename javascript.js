// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initCarousel();
    initScrollAnimations();
    initNavigation();
    initFormAnimations();
    init3DEffects();
});

// Particle System
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    setInterval(() => {
        createParticle(particlesContainer);
    }, 300);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Carousel Functionality
function initCarousel() {
    const cards = document.querySelectorAll('.tour-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        animateCarouselTransition();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        animateCarouselTransition();
    });

    // Auto-rotate carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }, 5000);
}

function animateCarouselTransition() {
    const carousel = document.querySelector('.tour-carousel');
    carousel.style.transform = 'rotateY(10deg)';
    setTimeout(() => {
        carousel.style.transform = 'rotateY(0deg)';
    }, 300);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.destination-cube, .section-title, .tour-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
}

// Navigation Effects
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Add 3D click effect
            link.style.transform = 'translateY(-3px) rotateX(15deg)';
            setTimeout(() => {
                link.style.transform = '';
            }, 200);
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// Form Animations
function initFormAnimations() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateZ(10px) scale(1.02)';
            input.parentElement.style.transform = 'rotateX(2deg)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = '';
            input.parentElement.style.transform = '';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate form submission
        form.style.transform = 'rotateY(360deg)';
        form.style.transition = 'transform 1s ease';
        
        setTimeout(() => {
            alert('Message sent successfully!');
            form.reset();
            form.style.transform = '';
        }, 1000);
    });
}

// 3D Effects and Interactions
function init3DEffects() {
    // Enhanced mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        


        // Apply 3D parallax to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `
                translateX(${mouseX * 15}px) 
                translateY(${mouseY * 15}px)
                rotateY(${mouseX * 5}deg)
                rotateX(${-mouseY * 5}deg)
                translateZ(20px)
            `;
        }

        // Apply background parallax effect
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `${50 + mouseX * 5}% ${50 + mouseY * 5}%`;
        }
    });

    // CTA Button 3D effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            ctaButton.style.transform = 'translateY(-5px) rotateX(15deg) scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'translateY(-5px) rotateX(15deg)';
            }, 150);
            
            // Scroll to destinations
            document.querySelector('#destinations').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Destination cubes enhanced interaction
    const destinationCubes = document.querySelectorAll('.destination-cube');
    destinationCubes.forEach(cube => {
        cube.addEventListener('mouseenter', () => {
            cube.style.transform = 'rotateY(180deg) scale(1.05)';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.transform = 'rotateY(0deg) scale(1)';
        });
    });

    // Book buttons with 3D effect
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show booking confirmation
            setTimeout(() => {
                alert('Booking initiated! Redirecting to booking page...');
            }, 300);
        });
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Throttle scroll events
let ticking = false;
let lastScrollY = 0;

function updateScrollEffects() {
    const currentScrollY = window.scrollY;
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.querySelector('.chat-toggle');
    
    // Calculate scroll direction and distance
    const scrollDelta = currentScrollY - lastScrollY;
    const scrollSpeed = Math.abs(scrollDelta);
    const scrollDirection = scrollDelta > 0 ? 1 : -1;
    
    // Enhanced floating effect for chatbot
    if (chatbot && chatbot.classList.contains('active')) {
        const floatY = scrollDelta * 0.4;
        const rotateX = scrollDelta * 0.15;
        const rotateY = scrollDelta * 0.08;
        const scale = 1 + (scrollSpeed * 0.001);
        
        chatbot.style.transform = `scale(${scale}) translateY(${floatY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        chatbot.style.boxShadow = `0 ${20 + scrollSpeed * 0.5}px ${40 + scrollSpeed}px rgba(0, 0, 0, ${0.3 + scrollSpeed * 0.002})`;
        
        setTimeout(() => {
            chatbot.style.transform = 'scale(1)';
            chatbot.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        }, 300);
    }
    
    // Enhanced floating effect for chat toggle button
    if (chatToggle) {
        const floatY = scrollDelta * 0.3;
        const rotateZ = scrollDelta * 0.1;
        const scale = 1 + (scrollSpeed * 0.002);
        
        chatToggle.style.transform = `scale(${scale}) translateY(${floatY}px) rotateZ(${rotateZ}deg)`;
        
        // Add pulsing effect during scroll
        if (scrollSpeed > 5) {
            chatToggle.style.animation = 'none';
            chatToggle.style.boxShadow = `0 ${10 + scrollSpeed * 0.3}px ${25 + scrollSpeed * 0.5}px rgba(102, 126, 234, ${0.4 + scrollSpeed * 0.003})`;
        }
        
        setTimeout(() => {
            chatToggle.style.transform = '';
            chatToggle.style.animation = 'pulse 2s infinite';
            chatToggle.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
        }, 400);
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Location Detection and Hotel Recommendations
function detectLocation() {
    const btn = document.querySelector('.detect-location-btn');
    const status = document.querySelector('.location-status');
    
    btn.textContent = '🔍 Detecting Location...';
    btn.disabled = true;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Simulate API call to get location name
                setTimeout(() => {
                    updateHotelsForLocation(lat, lon);
                    btn.textContent = '✅ Location Detected';
                    status.textContent = `Hotels near your location (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
                    btn.disabled = false;
                }, 1500);
            },
            (error) => {
                btn.textContent = '❌ Location Access Denied';
                status.textContent = 'Please enable location access or browse our general recommendations';
                btn.disabled = false;
                
                setTimeout(() => {
                    btn.textContent = '📍 Find Hotels Near Me';
                    status.textContent = 'Click to detect your location for personalized hotel recommendations';
                }, 3000);
            }
        );
    } else {
        btn.textContent = '❌ Location Not Supported';
        status.textContent = 'Your browser does not support location detection';
        btn.disabled = false;
    }
}

function updateHotelsForLocation(lat, lon) {
    // Simulate updating hotels based on location
    const hotelCards = document.querySelectorAll('.hotel-card');
    const locationBasedHotels = [
        { name: 'Local Comfort Inn', distance: '0.8km', price: '$120' },
        { name: 'Nearby Business Hotel', distance: '1.2km', price: '$180' },
        { name: 'City Center Lodge', distance: '2.1km', price: '$150' },
        { name: 'Premium Suites', distance: '1.5km', price: '$250' },
        { name: 'Budget Stay', distance: '3.2km', price: '$80' },
        { name: 'Luxury Resort', distance: '4.1km', price: '$350' }
    ];
    
    hotelCards.forEach((card, index) => {
        if (locationBasedHotels[index]) {
            const hotelInfo = card.querySelector('.hotel-info');
            const nameElement = hotelInfo.querySelector('h3');
            const locationElement = hotelInfo.querySelector('p');
            const priceElement = hotelInfo.querySelector('.hotel-price');
            
            // Add animation effect
            card.style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                nameElement.textContent = locationBasedHotels[index].name;
                locationElement.innerHTML = `📍 ${locationBasedHotels[index].distance} from your location`;
                priceElement.textContent = `${locationBasedHotels[index].price}/night`;
                
                card.style.transform = 'rotateY(0deg)';
            }, 300);
        }
    });
}

// AI Chatbot Functionality
let chatbotOpen = false;

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const notification = document.querySelector('.chat-notification');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbot.classList.add('active');
        notification.style.display = 'none';
    } else {
        chatbot.classList.remove('active');
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Travel-related responses
    if (message.includes('booking') || message.includes('book')) {
        return '📝 I can help you with bookings! Visit our Booking section to reserve your trip. You can select destinations, dates, and payment options.';
    }
    
    if (message.includes('hotel') || message.includes('accommodation')) {
        return '🏨 Check out our Hotels section! I can help you find accommodations near your location. We have luxury, budget, and boutique options available.';
    }
    
    if (message.includes('destination') || message.includes('place')) {
        return '🌍 We offer amazing destinations like Paris, Bali, Dubai, Tokyo, Swiss Alps, Maldives, New York, and Iceland! Each has unique experiences waiting for you.';
    }
    
    if (message.includes('price') || message.includes('cost')) {
        return '💰 Our tour packages range from $899 (Cultural Journey) to $2,499 (Luxury Escape). Hotel prices vary from $89-$399 per night depending on your choice.';
    }
    
    if (message.includes('payment') || message.includes('pay')) {
        return '💳 We accept all major credit cards (Visa, MasterCard, AmEx, Discover) and cash payments. We also offer discount coupons for savings!';
    }
    
    if (message.includes('tour') || message.includes('package')) {
        return '🎆 We have 3 main packages: Adventure Package ($1,299), Luxury Escape ($2,499), and Cultural Journey ($899). Each offers unique experiences!';
    }
    
    if (message.includes('location') || message.includes('near me')) {
        return '📍 Use our "Find Hotels Near Me" feature in the Hotels section to get personalized recommendations based on your current location!';
    }
    
    if (message.includes('contact') || message.includes('support')) {
        return '📞 You can reach us through our Contact section, or continue chatting with me! I\'m here 24/7 to help with your travel needs.';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return '👋 Hello! Welcome to TourVista! I\'m here to help you plan your perfect trip. What would you like to know about our destinations, tours, or services?';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return '😊 You\'re welcome! I\'m always happy to help. Feel free to ask me anything else about your travel plans!';
    }
    
    // Default response
    return '🤔 I\'m here to help with travel questions! Ask me about destinations, bookings, hotels, prices, tours, or anything travel-related. How can I assist you today?';
}

// Service tabs functionality
function showService(serviceType) {
    // Hide all service contents
    const contents = document.querySelectorAll('.service-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.service-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected service content
    document.getElementById(serviceType).style.display = 'block';
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Language support functionality
let currentLanguage = 'en';

const translations = {
    en: {
        home: 'Home',
        destinations: 'Destinations',
        tours: 'Tours',
        hotels: 'Hotels',
        festivals: 'Festivals',
        tracking: 'Tracking',
        memories: 'Memories',
        booking: 'Booking',
        contact: 'Contact',
        heroTitle: 'Discover Amazing Places',
        heroSubtitle: 'Experience the world in 3D',
        ctaButton: 'Start Your Journey'
    },
    es: {
        home: 'Inicio',
        destinations: 'Destinos',
        tours: 'Tours',
        hotels: 'Hoteles',
        festivals: 'Festivales',
        tracking: 'Seguimiento',
        memories: 'Recuerdos',
        booking: 'Reservas',
        contact: 'Contacto',
        heroTitle: 'Descubre Lugares Increíbles',
        heroSubtitle: 'Experimenta el mundo en 3D',
        ctaButton: 'Comienza tu Viaje'
    },
    fr: {
        home: 'Accueil',
        destinations: 'Destinations',
        tours: 'Circuits',
        hotels: 'Hôtels',
        festivals: 'Festivals',
        tracking: 'Suivi',
        memories: 'Souvenirs',
        booking: 'Réservation',
        contact: 'Contact',
        heroTitle: 'Découvrez des Lieux Extraordinaires',
        heroSubtitle: 'Découvrez le monde en 3D',
        ctaButton: 'Commencez votre Voyage'
    },
    de: {
        home: 'Startseite',
        destinations: 'Reiseziele',
        tours: 'Touren',
        hotels: 'Hotels',
        festivals: 'Festivals',
        tracking: 'Verfolgung',
        memories: 'Erinnerungen',
        booking: 'Buchung',
        contact: 'Kontakt',
        heroTitle: 'Entdecke Erstaunliche Orte',
        heroSubtitle: 'Erlebe die Welt in 3D',
        ctaButton: 'Starte deine Reise'
    }
};

function toggleLanguageMenu() {
    const menu = document.getElementById('langMenu');
    menu.classList.toggle('active');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    const langToggle = document.querySelector('.lang-toggle');
    const langCodes = {
        en: '🇺🇸 EN',
        es: '🇪🇸 ES',
        fr: '🇫🇷 FR',
        de: '🇩🇪 DE',
        it: '🇮🇹 IT',
        pt: '🇵🇹 PT',
        ru: '🇷🇺 RU',
        zh: '🇨🇳 ZH',
        ja: '🇯🇵 JA',
        ar: '🇸🇦 AR'
    };
    
    langToggle.innerHTML = `${langCodes[lang]} ▼`;
    
    // Update navigation text
    if (translations[lang]) {
        const navLinks = document.querySelectorAll('.nav-links a');
        const navTexts = ['home', 'destinations', 'tours', 'hotels', 'festivals', 'tracking', 'memories', 'booking', 'contact'];
        
        navLinks.forEach((link, index) => {
            if (navTexts[index] && translations[lang][navTexts[index]]) {
                link.textContent = translations[lang][navTexts[index]];
            }
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = translations[lang].heroSubtitle;
        if (ctaButton) ctaButton.textContent = translations[lang].ctaButton;
    }
    
    // Close menu
    document.getElementById('langMenu').classList.remove('active');
    
    // Show language change notification
    showLanguageNotification(lang);
}

function showLanguageNotification(lang) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1002;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = `Language changed to ${lang.toUpperCase()}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close language menu when clicking outside
document.addEventListener('click', (e) => {
    const langSelector = document.querySelector('.language-selector');
    const langMenu = document.getElementById('langMenu');
    
    if (langSelector && !langSelector.contains(e.target)) {
        langMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});