async function fetchPullRequestData() {
  const repo = 'iamAntimPal/iamAntimPal';
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/pulls?state=open`);
    const data = await response.json();
    const container = document.getElementById('pull-request-container');
    container.innerHTML = `<p>Open Pull Requests: ${data.length}</p>`;
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    document.getElementById('pull-request-container').innerHTML =
      '<p>Failed to load pull request data. Please try again later.</p>';
  }
}
fetchPullRequestData();
