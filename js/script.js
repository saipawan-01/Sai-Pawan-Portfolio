// Initialize EmailJS
(function() {
    try {
        emailjs.init({
            publicKey: "UlNiT1XcTtMP6Fwtf"
        });
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization failed:", error);
    }
})();

// Loading screen with enhanced animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Initialize particles after loading
        createParticles();
        
        // Start skill progress animations
        animateSkillBars();
    }, 1500);
});

// Enhanced Custom Cursor System
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursors() {
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
    
    if (cursorTrail) {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }
    
    requestAnimationFrame(updateCursors);
}
updateCursors();

// Cursor interactions
document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.mixBlendMode = 'normal';
        cursor.style.background = 'var(--accent)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'difference';
        cursor.style.background = 'var(--accent)';
    });
});

// Floating Particles System
function createParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particleContainer.appendChild(particle);
        
        // Remove and recreate particle when animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }
}

// Enhanced Navigation
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effects
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('skill-card')) {
                animateSkillCard(entry.target);
            }
            
            if (entry.target.classList.contains('project-card')) {
                animateProjectCard(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Skill Progress Bar Animations
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        }
    });
}

function animateSkillCard(card) {
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) {
        const progress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
            progressBar.style.width = progress + '%';
        }, 300);
    }
}

function animateProjectCard(card) {
    // Add stagger effect to project links
    const links = card.querySelectorAll('.project-link');
    links.forEach((link, index) => {
        setTimeout(() => {
            link.style.transform = 'translateY(0)';
            link.style.opacity = '1';
        }, index * 100);
    });
}

// Tilt Effect for Cards
document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        element.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)
             scale3d(1.05, 1.05, 1.05)`;
        element.style.transition = 'transform 0s'; // immediate during mousemove
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        element.style.transition = 'transform 0.3s ease-out'; // smooth reset
    });
});

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        element.style.transition = 'transform 0.3s ease-out'; // smooth reset
    });
  
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

// Typing Animation for Hero
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            typeWriter(typingElement, 'Sai Pawan', 150);
        }
    }, 2000);
});

// Enhanced Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    const btnText = submitBtn.querySelector('.btn-text');
    
    // Show loading state with enhanced animation
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-success', 'btn-error');
    submitBtn.style.transform = 'scale(0.98)';
    
    // Get form data with validation
    const formData = {
        from_name: document.getElementById('from_name').value.trim(),
        from_email: document.getElementById('from_email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_name: 'Sai Pawan'
    };
    
    // Enhanced validation
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
        showFormError(submitBtn, btnText, originalText, 'Please fill all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
        showFormError(submitBtn, btnText, originalText, 'Please enter a valid email');
        return;
    }
    
    // Send email using EmailJS
    emailjs.send('service_nx582qa', 'template_22p7xmd', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success state with celebration animation
            btnText.textContent = 'Message Sent! 🎉';
            submitBtn.classList.add('btn-success');
            submitBtn.style.transform = 'scale(1.05)';
            
            // Create success particles
            createSuccessParticles(submitBtn);
            
            // Reset form with smooth animation
            const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
            formInputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        input.value = '';
                        input.style.transform = 'scale(1)';
                    }, 150);
                }, index * 50);
            });
            
            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.style.transform = 'scale(1)';
            }, 4000);
            
        }, function(error) {
            console.error('FAILED...', error);
            showFormError(submitBtn, btnText, originalText, 'Failed to send message');
        });
});

function showFormError(submitBtn, btnText, originalText, message) {
    btnText.textContent = message;
    submitBtn.classList.add('btn-error');
    submitBtn.style.transform = 'scale(1)';
    
    // Add shake animation
    submitBtn.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-error');
        submitBtn.style.animation = '';
    }, 3000);
}

function createSuccessParticles(button) {
    const rect = button.getBoundingClientRect();
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = 'var(--success)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (360 / particles) * i;
        const velocity = 100;
        const gravity = 0.5;
        const friction = 0.99;
        
        let vx = Math.cos(angle * Math.PI / 180) * velocity;
        let vy = Math.sin(angle * Math.PI / 180) * velocity;
        
        function animateParticle() {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            
            particle.style.left = (currentLeft + vx) + 'px';
            particle.style.top = (currentTop + vy) + 'px';
            
            vx *= friction;
            vy = vy * friction + gravity;
            
            if (currentTop < window.innerHeight + 50) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Hero background parallax
    const heroShapes = document.querySelectorAll('.shape');
    heroShapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Section backgrounds
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
});

// Enhanced Intersection Observer for Advanced Animations
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations for multiple elements
            if (entry.target.classList.contains('skill-card') || 
                entry.target.classList.contains('interest-card') || 
                entry.target.classList.contains('project-card')) {
                
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
            } else {
                entry.target.classList.add('animate');
            }
            
            // Special animations for specific elements
            if (entry.target.id === 'reads') {
                animateBookCover();
            }
            
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .skill-card, .interest-card, .project-card').forEach(el => {
    advancedObserver.observe(el);
});

// Book cover 3D animation
function animateBookCover() {
    const bookCover = document.querySelector('.book-cover');
    if (bookCover) {
        setTimeout(() => {
            bookCover.style.transform = 'rotateY(-15deg) rotateX(5deg)';
        }, 500);
    }
}

// Counter animations for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent === '∞' ? '∞' : parseInt(counter.textContent);
        if (target === '∞') return;
        
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Reading progress simulation for book
function updateReadingProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        let currentProgress = 65;
        const targetProgress = Math.min(currentProgress + Math.random() * 2, 100);
        
        let current = currentProgress;
        const timer = setInterval(() => {
            if (current >= targetProgress) {
                clearInterval(timer);
            } else {
                current += 0.5;
                progressFill.style.width = current + '%';
                progressText.textContent = Math.floor(current) + '%';
            }
        }, 100);
    }
}

// Advanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Close mobile menu
        document.getElementById('mobileToggle').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
        
        // Remove focus from active elements
        document.activeElement.blur();
    }
    
    // Arrow key navigation for sections
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        navigateToNextSection();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        navigateToPrevSection();
    }
});

function navigateToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => section.id === currentSection);
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function navigateToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => section.id === currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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

// Apply throttling to scroll-heavy functions
const throttledParallax = throttle(() => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.shape');
    heroShapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledParallax);

// Add CSS animation keyframes via JavaScript for shake effect
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth loading animation to elements
    const elements = document.querySelectorAll('*');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.01}s`;
    });
    
    // Initialize reading progress update
    setTimeout(updateReadingProgress, 3000);
    
    // Preload critical images
    const criticalImages = [
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">...</svg>' // Book cover
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    console.log('🚀 Portfolio initialized successfully!');

    document.getElementById('downloadResume').addEventListener('click', function (e) {
  e.preventDefault(); // stop the default link behavior
  window.location.href = 'https://drive.google.com/uc?export=download&id=1qMxxJbO2vd3zQkHWnPaY1AeZFKLIQa_3';
});

});