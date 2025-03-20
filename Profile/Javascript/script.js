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

// Fetch and display top 4 repositories dynamically
async function fetchTopRepos() {
  const username = 'iamAntimPal';
  try {
    // Fetch all public repositories for the user
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await response.json();
    
    // Sort repositories by star count in descending order
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Select the top 4 repositories (changed from 3 to 4)
    const topRepos = repos.slice(0, 4);
    
    // Get the container element where repos will be added
    const container = document.getElementById('repos-container');
    
    // Create a card for each top repository using the GitHub ReadMe Stats "pin" card
    topRepos.forEach(repo => {
      const anchor = document.createElement('a');
      anchor.href = repo.html_url;
      anchor.target = '_blank';
      
      // Construct the image URL with the repo name and desired theme
      const img = document.createElement('img');
      img.src = `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}&theme=dark`;
      img.alt = repo.name;
      
      anchor.appendChild(img);
      container.appendChild(anchor);
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    document.getElementById('repos-container').innerHTML = '<p>Failed to load repositories.</p>';
  }
}

// Call the function on page load
fetchTopRepos();
