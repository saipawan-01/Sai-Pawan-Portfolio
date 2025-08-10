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

// Loading screen
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

// Custom Cursor System
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
if (cursor && cursorTrail) {
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let trailX = 0, trailY = 0;
    function updateCursors() {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(updateCursors);
    }
    updateCursors();
    
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

// Navigation
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
        navbar.style.transform = (scrollTop > lastScrollTop && scrollTop > 100) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        try {
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Invalid selector:', href, error);
        }
    });
});

// Active Nav Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            obs.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

// CRITICAL FIX: Observe all elements that need animation
document.querySelectorAll('.animate-on-scroll, .skill-card, .interest-card, .project-card').forEach(el => {
    observer.observe(el);
});


// Skill Bar Animations
function animateSkillBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
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

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
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

// Resume Download
document.getElementById('downloadResume')?.addEventListener('click', function (e) {
    e.preventDefault();
    const btnText = this.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = "Downloading...";
    
    const fileUrl = "https://docs.google.com/document/d/1qMxxJbO2vd3zQkHWnPaY1AeZFKLIQa_3/export?format=pdf";
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = "Sai-Pawan-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
        btnText.textContent = originalText;
    }, 2000);
});