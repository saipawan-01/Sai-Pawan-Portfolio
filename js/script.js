// Scroll animation & contact form
document.addEventListener("DOMContentLoaded", () => {
  // Section reveal animation if needed
  const sections = document.querySelectorAll(".portfolio-section");
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));
  }

  // Contact Form EmailJS example
  const contactForm = document.getElementById("contact-form");
  const statusDiv = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      statusDiv.textContent = "Sending...";

      // --- PLACEHOLDER: insert real EmailJS call here ---
      // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
      //   .then(() => {
      //     statusDiv.textContent = "Message sent! Thank you.";
      //     contactForm.reset();
      //   }, () => {
      //     statusDiv.textContent = "Failed. Please try again or email me directly!";
      //   });

      setTimeout(() => {
        statusDiv.textContent = "Message sent! (Demo — connect EmailJS for real email sending).";
        contactForm.reset();
      }, 1400);
    });
  }
});
