const { Octokit } = require("@octokit/rest");
const { createPieChart } = require("svg-pie-chart");
const fs = require("fs").promises;

const octokit = new Octokit({ auth: process.env.GH_TOKEN });
const today = new Date().toISOString().split("T")[0];

async function getTodayCommits(owner, repo) {
  try {
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      since: `${today}T00:00:00Z`,
      per_page: 100,
    });
    return data.length;
  } catch (error) {
    return 0;
  }
}

async function generateWidget() {
  // Get all user repositories
  const repos = [];
  for await (const response of octokit.paginate.iterator(
    octokit.rest.repos.listForUser,
    { username: "iamAntimPal", per_page: 100 }
  )) {
    repos.push(...response.data);
  }

  // Get commit counts for today
  const commitData = await Promise.all(
    repos.map(async (repo) => ({
      name: repo.name,
      count: await getTodayCommits("iamAntimPal", repo.name),
    }))
  );

  // Filter and sort
  const filtered = commitData.filter((d) => d.count > 0);
  const sorted = filtered.sort((a, b) => b.count - a.count).slice(0, 5);

  // Create SVG content
  const svgContent = `
    <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: bold 14px Arial; fill: #e6e6e6; }
        .repo { font: 12px monospace; fill: #8cc265; }
        .count { font: 12px monospace; fill: #6aa3ff; text-anchor: end; }
        .chart { font: 10px Arial; fill: #e6e6e6; }
      </style>
      <rect width="100%" height="100%" fill="#161b22"/>
      
      <text x="20" y="30" class="header">Today's Activity - iamAntimPal</text>
      
      ${sorted
        .map(
          (d, i) => `
        <text x="20" y="${60 + i * 25}" class="repo">${d.name}</text>
        <text x="280" y="${60 + i * 25}" class="count">${d.count} commits</text>
      `
        )
        .join("")}
      
      ${createPieChart({
        data: sorted.map((d) => ({
          label: d.name,
          value: d.count,
        })),
        colors: ["#8cc265", "#6aa3ff", "#ff7b72", "#d299c2", "#f6c555"],
        width: 250,
        height: 180,
        x: 350,
        y: 10,
        showLegend: true,
        legendPosition: "right",
      })}
    </svg>
  `;

  await fs.writeFile("stats/widget.svg", svgContent);
}

generateWidget();