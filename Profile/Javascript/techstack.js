 // GSAP Animation for smooth fade-in
  document.addEventListener("DOMContentLoaded", function() {
    gsap.from(".tech-category", { opacity: 0, y: 50, duration: 1, stagger: 0.3 });
  });


    const toggleButton = document.getElementById('toggle-theme');
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });


  
// AOS Animation Script -->

 document.addEventListener("DOMContentLoaded", function() {
     AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
 });


// Initialize AOS when the page loads
// Duration: 1 second

document.addEventListener("DOMContentLoaded", function() {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
});

// AOS Library 
document.addEventListener("DOMContentLoaded", function() {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    });
