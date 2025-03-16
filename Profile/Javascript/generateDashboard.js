const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/dashboard.html`, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'dailycommit_dashboard.png', fullPage: true });
  await browser.close();
})();
