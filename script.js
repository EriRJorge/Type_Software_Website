// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    // Swipe left to close menu
    if (diff > swipeThreshold && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Smooth scrolling for navigation links
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

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Project card hover effects (desktop only)
if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced cursor trail effect (desktop only)
if (window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor trail position
        const trail = document.querySelector('.cursor-trail');
        if (trail) {
            trail.style.left = mouseX - 4 + 'px';
            trail.style.top = mouseY - 4 + 'px';
            
            // Add hover effect for interactive elements
            const elementBelow = document.elementFromPoint(mouseX, mouseY);
            if (elementBelow && (elementBelow.tagName === 'A' || elementBelow.tagName === 'BUTTON' || elementBelow.classList.contains('project-card'))) {
                trail.style.transform = 'scale(1.5)';
                trail.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, transparent 100%)';
            } else {
                trail.style.transform = 'scale(1)';
                trail.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)';
            }
        }
    });
}

// Add interactive elements animation (desktop only)
if (window.innerWidth > 768) {
    setInterval(() => {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((el, index) => {
            const delay = index * 500;
            setTimeout(() => {
                el.style.transform = `translateY(${Math.random() * 20 - 10}px) rotate(${Math.random() * 360}deg)`;
            }, delay);
        });
    }, 3000);
}

// Typing animation for code snippet
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const codeSnippet = entry.target.querySelector('.code-snippet');
            if (codeSnippet && !codeSnippet.classList.contains('typed')) {
                codeSnippet.classList.add('typed');
                const originalText = codeSnippet.innerHTML;
                typeWriter(codeSnippet, originalText, 50);
            }
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Parallax effect for floating elements (desktop only)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text);
                    animateCounter(stat, number);
                } else if (text === '∞') {
                    stat.style.animation = 'pulse 2s infinite';
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .community-stats').forEach(stats => {
    statsObserver.observe(stats);
});

// Mobile-specific optimizations
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // Disable cursor trail on mobile
    const trail = document.querySelector('.cursor-trail');
    if (trail) {
        trail.style.display = isMobile ? 'none' : 'block';
    }
    
    // Disable floating elements on mobile
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(el => {
        el.style.display = isMobile ? 'none' : 'block';
    });
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Handle resize events
window.addEventListener('resize', throttle(handleResize, 250));

// Initialize mobile optimizations
handleResize();

// Add CSS for pulse animation and mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            transition: all 0.3s ease;
        }
        
        .mobile-menu-btn span {
            transition: all 0.3s ease;
        }
    }
`;
document.head.appendChild(style);

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
} 