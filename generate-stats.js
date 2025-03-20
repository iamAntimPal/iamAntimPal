const { Octokit } = require("@octokit/rest");
const svgPieChart = require("svg-pie-chart");
const fs = require("fs");

// Create an Octokit instance using an environment variable for the token
const octokit = new Octokit({
  auth: process.env.GH_TOKEN
});

// Example function to fetch some data (e.g., user public repos count)
async function fetchData() {
  try {
    // Replace 'your-username' with the GitHub username or use another endpoint
    const { data } = await octokit.users.getByUsername({ username: "your-username" });
    return {
      publicRepos: data.public_repos
      // Add other stats as needed
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}

async function generateSVG() {
  const stats = await fetchData();
  if (!stats) {
    console.error("No stats data available.");
    process.exit(1);
  }

  // Create sample data for the pie chart
  // For example: public repos vs. remaining target (assuming a target of 100)
  const chartData = [
    { label: "Public Repos", value: stats.publicRepos },
    { label: "Remaining", value: Math.max(0, 100 - stats.publicRepos) }
  ];

  // Generate the SVG chart
  const svg = svgPieChart(chartData, {
    width: 300,
    height: 300
  });

  // Ensure stats directory exists
  fs.mkdirSync("stats", { recursive: true });
  fs.writeFileSync("stats/widget.svg", svg);
  console.log("SVG generated at stats/widget.svg");
}

generateSVG();
