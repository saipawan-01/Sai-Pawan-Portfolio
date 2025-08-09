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
// ... (keep the rest of your script as-is; no changes needed) ...

// Contact form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    const btnText = submitBtn.querySelector('.btn-text');
    
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-success', 'btn-error');
    submitBtn.style.transform = 'scale(0.98)';

    const formData = {
        from_name: document.getElementById('from_name').value.trim(),
        from_email: document.getElementById('from_email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_name: 'Sai Pawan'
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
        showFormError(submitBtn, btnText, originalText, 'Please fill all fields');
        return;
    }
    if (!emailRegex.test(formData.from_email)) {
        showFormError(submitBtn, btnText, originalText, 'Please enter a valid email');
        return;
    }

    emailjs.send('service_nx582qa', 'template_22p7xmd', formData)
    .then(function(response) {
        btnText.textContent = 'Message Sent! 🎉';
        submitBtn.classList.add('btn-success');
        submitBtn.style.transform = 'scale(1.05)';
        createSuccessParticles(submitBtn);
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
        setTimeout(() => {
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
            submitBtn.style.transform = 'scale(1)';
        }, 4000);
    }, function(error) {
        showFormError(submitBtn, btnText, originalText, 'Failed to send message');
    });
});

function showFormError(submitBtn, btnText, originalText, message) {
    btnText.textContent = message;
    submitBtn.classList.add('btn-error');
    submitBtn.style.transform = 'scale(1)';
    submitBtn.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-error');
        submitBtn.style.animation = '';
    }, 3000);
}

function createSuccessParticles(button) {
    // Particle effect code as in your original file ...
}

// Other functions unchanged
