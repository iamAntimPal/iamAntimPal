const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const { createPieChart } = require('svg-pie-chart');

const octokit = new Octokit({ auth: process.env.GH_TOKEN });
const today = new Date().toISOString().split('T')[0];

async function getRepoCommits(repo) {
  try {
    const { data } = await octokit.rest.repos.listCommits({
      owner: repo.split('/')[0],
      repo: repo.split('/')[1],
      since: `${today}T00:00:00Z`,
      per_page: 100
    });
    return { repo, count: data.length };
  } catch (e) {
    return { repo, count: 0 };
  }
}

async function generateWidget() {
  const repos = JSON.parse(fs.readFileSync('stats/repos.json'))
    .map(r => r.nameWithOwner);

  const commitData = await Promise.all(repos.map(getRepoCommits));
  const sorted = commitData
    .filter(d => d.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Generate SVG content
  const svg = `
    <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font-family: Arial; font-size: 14px; fill: #e6e6e6; }
        .repo { font-family: monospace; font-size: 12px; fill: #8cc265; }
        .count { font-family: monospace; font-size: 12px; fill: #6aa3ff; }
      </style>
      <rect width="100%" height="100%" fill="#161b22"/>
      
      <text x="20" y="30" class="header">Today's Top Repositories</text>
      
      ${sorted.map((d, i) => `
        <text x="20" y="${60 + i*25}" class="repo">${d.repo}</text>
        <text x="220" y="${60 + i*25}" class="count" text-anchor="end">${d.count} commits</text>
      `).join('')}
      
      ${createPieChart({
        data: sorted.map(d => ({ label: d.repo, value: d.count })),
        width: 200,
        height: 200,
        x: 380,
        y: 20,
        colors: ['#8cc265', '#6aa3ff', '#ff7b72', '#d299c2', '#f6c555']
      })}
    </svg>
  `;

  fs.writeFileSync('stats/widget.svg', svg);
}

generateWidget();