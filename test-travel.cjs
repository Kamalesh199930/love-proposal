const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Testing full-screen travel of NO button on desktop and mobile...');
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,850'],
    defaultViewport: { width: 1280, height: 850 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const artifactDir = '/home/kamalesh/.gemini/antigravity/brain/49ca6a60-6a16-4b52-b589-79e92f662043';

  // Find NO button
  let noBtn = (await page.$$('button'))[2]; // third button is NO
  const posHistory = [];

  for (let i = 0; i < 6; i++) {
    const box = await noBtn.boundingBox();
    posHistory.push({ step: i, x: Math.round(box.x), y: Math.round(box.y) });
    console.log(`Step ${i} NO button pos: x=${Math.round(box.x)}, y=${Math.round(box.y)}`);

    // Move mouse near/to button
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise(r => setTimeout(r, 450));
    noBtn = (await page.$$('button'))[2];
  }

  await page.screenshot({ path: `${artifactDir}/multi-dodge-desktop.png` });
  console.log('Captured multi-dodge-desktop.png');

  // Test mobile view
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  noBtn = (await page.$$('button'))[2];
  const mobileHistory = [];

  for (let i = 0; i < 5; i++) {
    const box = await noBtn.boundingBox();
    mobileHistory.push({ step: i, x: Math.round(box.x), y: Math.round(box.y) });
    console.log(`Mobile step ${i} NO pos: x=${Math.round(box.x)}, y=${Math.round(box.y)}`);

    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise(r => setTimeout(r, 450));
    noBtn = (await page.$$('button'))[2];
  }

  await page.screenshot({ path: `${artifactDir}/multi-dodge-mobile.png` });
  console.log('Captured multi-dodge-mobile.png');

  await browser.close();
  console.log('All travel tests completed successfully!');
})();
