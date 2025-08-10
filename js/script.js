// ========================================
// COMPLETE FIXED JAVASCRIPT FILE
// All utility functions, error handling, and optimizations included
// ========================================

// === UTILITY FUNCTIONS ===
function throttle(func, wait) {
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

// Initialize EmailJS with error handling
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

// Enhanced mobile detection helper
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Global error handler for EmailJS and other promises
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Could show user-friendly error message here
});

// Loading screen with enhanced animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
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

if (cursor || cursorTrail) {
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

    // Cursor interactions - with safety check
    if (cursor) {
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
    }
}

// Floating Particles System
function createParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer || isMobile()) return; // disable particles on mobile
    
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

// Enhanced Mobile menu toggle with keyboard support
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Navbar scroll effects
if (navbar) {
    let lastScrollTop = 0;
    const scrollHandler = throttle(() => {
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
    }, 16);

    window.addEventListener('scroll', scrollHandler);
}

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        
        // Validate href - must be more than just "#"
        if (!href || href === '#' || href.length <= 1) {
            // For empty hash, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        try {
            const target = document.querySelector(href);
            if (target) {
                // Use actual navbar height for offset
                const headerOffset = navbar ? navbar.offsetHeight : 0;
                const offsetTop = target.offsetTop - headerOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target element not found for:', href);
            }
        } catch (error) {
            console.error('Invalid selector:', href, error);
        }
    });
});

// Active navigation link highlighting
const activeNavHandler = throttle(() => {
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
}, 100);

window.addEventListener('scroll', activeNavHandler);

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

// Enhanced Tilt Effect for Cards
document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        if (isMobile()) return; // Disable on mobile
        
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

// Enhanced Contact Form with better error handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Show loading state with enhanced animation
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.remove('btn-success', 'btn-error');
        submitBtn.classList.add('loading');
        submitBtn.style.transform = 'scale(0.98)';
        
        // Get form data with validation
        const formData = {
            from_name: document.getElementById('from_name')?.value.trim() || '',
            from_email: document.getElementById('from_email')?.value.trim() || '',
            subject: document.getElementById('subject')?.value.trim() || '',
            message: document.getElementById('message')?.value.trim() || '',
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

        // Name validation
        if (formData.from_name.length < 2) {
            showFormError(submitBtn, btnText, originalText, 'Please enter a valid name');
            return;
        }

        // Message validation
        if (formData.message.length < 10) {
            showFormError(submitBtn, btnText, originalText, 'Please enter a longer message');
            return;
        }
        
        // Send email using EmailJS with timeout
        const sendPromise = emailjs.send('service_nx582qa', 'template_22p7xmd', formData);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 10000)
        );

        Promise.race([sendPromise, timeoutPromise])
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success state with celebration animation
                btnText.textContent = 'Message Sent! 🎉';
                submitBtn.classList.add('btn-success');
                submitBtn.classList.remove('loading');
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
                
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                let errorMessage = 'Failed to send message';
                
                if (error.message === 'Request timeout') {
                    errorMessage = 'Request timed out. Please try again.';
                } else if (error.status === 400) {
                    errorMessage = 'Invalid form data. Please check your inputs.';
                } else if (error.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                
                showFormError(submitBtn, btnText, originalText, errorMessage);
            });
    });
}

function showFormError(submitBtn, btnText, originalText, message) {
    btnText.textContent = message;
    submitBtn.classList.add('btn-error');
    submitBtn.classList.remove('loading');
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
    if (isMobile()) return; // Skip particles on mobile
    
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

// Parallax Effects - Desktop only, avoid section transforms to prevent overlap
function resetParallaxTransforms() {
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.transform = '';
    });
    document.querySelectorAll('.section').forEach(section => {
        section.style.transform = '';
    });
}

const throttledParallax = throttle(() => {
    if (isMobile()) return; // guard
    const scrolled = window.pageYOffset;
    // Only move hero shapes; do NOT transform sections
    const heroShapes = document.querySelectorAll('.shape');
    heroShapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16);

function updateParallaxBinding() {
    resetParallaxTransforms();
    window.removeEventListener('scroll', throttledParallax);
    if (!isMobile()) {
        window.addEventListener('scroll', throttledParallax);
    }
}

// initial bind/unbind
updateParallaxBinding();
// re-evaluate on resize
window.addEventListener('resize', debounce(updateParallaxBinding, 150));

// Resume download functionality with enhanced error handling
document.addEventListener("DOMContentLoaded", function () {
    const resumeBtn = document.getElementById('downloadResume');

    if (!resumeBtn) return; // Exit if button not found

    resumeBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        
        const btnText = this.querySelector('.btn-text');
        if (!btnText) return;
        
        const originalText = btnText.textContent;

        // Show loading state
        btnText.textContent = "Downloading...";
        this.classList.add("loading");

        try {
            // Google Drive direct download link (force download)
            const fileUrl = "https://drive.google.com/uc?export=download&id=1qMxxJbO2vd3zQkHWnPaY1AeZFKLIQa_3";

            // Create temporary link element to trigger download
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = "Sai_Pawan_Resume.pdf";
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Show success state
            setTimeout(() => {
                btnText.textContent = "Downloaded!";
            }, 1000);

        } catch (error) {
            console.error('Download failed:', error);
            btnText.textContent = "Download Failed";
        }

        // Reset button state after 2 seconds
        setTimeout(() => {
            btnText.textContent = originalText;
            this.classList.remove("loading");
        }, 2000);
    });
});

// Enhanced reading progress update function
function updateReadingProgress() {
    const progressBar = document.querySelector('.progress-fill');
    if (!progressBar) return;
    
    // Simulate reading progress (you can replace this with actual logic)
    let currentProgress = 0;
    const targetProgress = 100; // 100% for "Atomic Habits"
    
    const interval = setInterval(() => {
        currentProgress += 2;
        if (progressBar) {
            progressBar.style.width = currentProgress + '%';
        }
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${currentProgress}% Complete`;
        }
        
        if (currentProgress >= targetProgress) {
            clearInterval(interval);
            if (progressText) {
                progressText.textContent = "Finished Reading!";
            }
        }
    }, 100);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const now = performance.now();
        
        if (now - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));
            
            // If FPS is too low, disable expensive animations
            if (fps < 30 && !isMobile()) {
                console.warn('Low FPS detected, disabling some animations');
                document.body.classList.add('low-performance');
            }
            
            frameCount = 0;
            lastTime = now;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    // Only monitor performance on desktop
    if (!isMobile()) {
        requestAnimationFrame(checkFPS);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth loading animation to elements
    const elements = document.querySelectorAll('*');
    elements.forEach((el, index) => {
        if (index < 100) { // Limit to first 100 elements for performance
            el.style.animationDelay = `${index * 0.01}s`;
        }
    });
    
    // Initialize reading progress update
    setTimeout(updateReadingProgress, 3000);
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.loading = 'eager';
    });
    
    console.log('🚀 Portfolio initialized successfully!');
    
    // Add service worker registration for offline functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause expensive animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    document.body.classList.add('offline');
});

// Cleanup function for better memory management
window.addEventListener('beforeunload', () => {
    // Clear any intervals or timeouts
    observer?.disconnect?.();
    
    // Remove event listeners that might cause memory leaks
    window.removeEventListener('scroll', throttledParallax);
    window.removeEventListener('scroll', activeNavHandler);
    
    console.log('Cleanup completed');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isMobile,
        typeWriter,
        createSuccessParticles,
        updateReadingProgress
    };
}