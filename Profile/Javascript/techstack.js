 // GSAP Animation for smooth fade-in
  document.addEventListener("DOMContentLoaded", function() {
    gsap.from(".tech-category", { opacity: 0, y: 50, duration: 1, stagger: 0.3 });
  });


    const toggleButton = document.getElementById('toggle-theme');
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });


  
<!-- AOS Animation Script -->
    // Initialize AOS when the page loads
    // Duration: 1 second
    // Easing: ease-in-out
    // Once: true (will only trigger once)
    // The 'init' function is called automatically when the DOM is fully loaded.
    // 'AOS' is a global variable that refers to the AOS library
   document.addEventListener("DOMContentLoaded", function() {
       AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
   });