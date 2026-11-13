const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1280,850'],
    defaultViewport: { width: 1280, height: 850 }
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('PAGE ERROR:', msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
    console.log('UNCAUGHT ERROR:', err.message);
  });

  console.log('Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  await new Promise(r => setTimeout(r, 1200));

  // Proposal Screenshot
  const artifactDir = '/home/kamalesh/.gemini/antigravity/brain/49ca6a60-6a16-4b52-b589-79e92f662043';
  await page.screenshot({ path: `${artifactDir}/proposal-screen.png` });
  console.log('Captured proposal-screen.png');

  // Find NO button and hover
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons on page.`);

  // Find NO button text
  let noButton = null;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('NO') || text.includes('🙈')) {
      noButton = btn;
      break;
    }
  }

  if (noButton) {
    const boxBefore = await noButton.boundingBox();
    console.log('NO button initial pos:', boxBefore);

    // Hover over NO button
    await noButton.hover();
    await new Promise(r => setTimeout(r, 600));

    const boxAfter = await noButton.boundingBox();
    console.log('NO button escaped pos:', boxAfter);

    await page.screenshot({ path: `${artifactDir}/no-dodge-screen.png` });
    console.log('Captured no-dodge-screen.png');
  }

  // Find YES button and click
  let yesButton = null;
  const currentButtons = await page.$$('button');
  for (const btn of currentButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('YES')) {
      yesButton = btn;
      break;
    }
  }

  if (yesButton) {
    console.log('Clicking YES button...');
    await yesButton.click();
    await new Promise(r => setTimeout(r, 1500));

    // Wait for celebration header
    await page.waitForSelector('h1');
    const h1Text = await page.evaluate(() => document.querySelector('h1')?.textContent);
    console.log('Celebration H1:', h1Text);

    await page.screenshot({ path: `${artifactDir}/celebration-screen.png` });
    console.log('Captured celebration-screen.png');

    // Find and click blow candles button
    const cakeButtons = await page.$$('button');
    for (const btn of cakeButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Blow the Candles')) {
        console.log('Clicking Blow Candles...');
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: `${artifactDir}/cake-wish-screen.png` });
        console.log('Captured cake-wish-screen.png');
        break;
      }
    }
  }

  console.log('Console errors count:', consoleErrors.length);
  await browser.close();
  console.log('Test completed successfully!');
})();
