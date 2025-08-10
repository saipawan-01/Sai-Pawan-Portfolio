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
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        createParticles();
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
    if (!particleContainer) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(particle);
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}

// Enhanced Navigation
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

if (navbar) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollTop > 100);
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Fixed Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        try {
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Invalid selector:', href, error);
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
});

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

// THIS IS THE CRITICAL FIX FOR ANIMATIONS
// It now looks for your cards in addition to the section headers.
document.querySelectorAll('.animate-on-scroll, .skill-card, .interest-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Skill Progress Bar Animations
function animateSkillBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            bar.style.width = progress + '%';
        }
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
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
});

// Enhanced Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        if (!submitBtn) return;
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm('service_nx582qa', 'template_22p7xmd', this)
            .then(() => {
                btnText.textContent = 'Message Sent! 🎉';
                contactForm.reset();
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);
            }, (error) => {
                btnText.textContent = 'Failed to send';
                console.error('FAILED...', error);
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);
            });
    });
}

// Resume download functionality
document.addEventListener("DOMContentLoaded", function () {
    const resumeBtn = document.getElementById('downloadResume');
    if (!resumeBtn) return;
    resumeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const btnText = this.querySelector('.btn-text');
        if (!btnText) return;
        const originalText = btnText.textContent;
        btnText.textContent = "Downloading...";
        this.classList.add("loading");
        const fileUrl = "https://drive.google.com/uc?export=download&id=1qMxxJbO2vd3zQkHWnPaY1AeZFKLIQa_3";
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = "Sai-Pawan-Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
            btnText.textContent = originalText;
            this.classList.remove("loading");
        }, 2000);
    });
});