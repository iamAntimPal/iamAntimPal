/* JavaScript here */
// Dark mode
document.body.classList.toggle('dark-mode');

document.body.classList.toggle('light-mode');

// Toggle Theme Function
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.theme-toggle').textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
document.querySelector('.theme-toggle').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

// Scrollspy functionality
document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    // Toggle the "active" class on the link corresponding to the visible section
                    link.classList.toggle('active', link.getAttribute('href').replace('#', '') === section.id);
                });
            }
        });
    }, { threshold: 0.5 });
    observer.observe(section);
});
