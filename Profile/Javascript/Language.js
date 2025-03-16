async function fetchLanguageStats() {
  const repo = 'iamAntimPal/iamAntimPal';
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/languages`);
    const data = await response.json();
    const total = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
    const languages = Object.keys(data).map(lang => ({ language: lang, bytes: data[lang] }));
    languages.sort((a, b) => b.bytes - a.bytes);
    const topThree = languages.slice(0, 3);
    const container = document.getElementById('language-stats-container');
    topThree.forEach(item => {
      const percentage = (item.bytes / total) * 100;
      let color = 'lightgrey';
      if (item.language.toLowerCase() === 'html') color = 'E34F26';
      else if (item.language.toLowerCase() === 'css') color = '1572B6';
      else if (item.language.toLowerCase() === 'javascript') color = 'F7DF1E';
      else if (item.language.toLowerCase() === 'python') color = '3776AB';
      const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(item.language)}-${percentage.toFixed(1)}%25-${color}?style=for-the-badge`;
      const badge = document.createElement('img');
      badge.src = badgeUrl;
      badge.alt = `${item.language}: ${percentage.toFixed(1)}%`;
      container.appendChild(badge);
    });
  } catch (error) {
    console.error('Error fetching language stats:', error);
    document.getElementById('language-stats-container').innerHTML = '<p>Failed to load language stats.</p>';
  }
}
fetchLanguageStats();
