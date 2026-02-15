/**
 * Render box-net.html to PNG for visual preview.
 * Usage: node scripts/preview-boxnet.js
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function imageToDataUrl(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const buf = fs.readFileSync(filepath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

async function main() {
  const packJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'packs/chibi-kitty-club/characters.json'), 'utf-8'));

  const charDir = path.join(ROOT, 'packs/chibi-kitty-club/characters');
  const characters = packJson.characters.map(ch => {
    const imgPath = path.join(charDir, `${ch.id}.png`);
    const imageDataUrl = fs.existsSync(imgPath) ? imageToDataUrl(imgPath) : '';
    return { ...ch, imageDataUrl };
  });

  const templateData = {
    ...packJson,
    characters,
    rarityColors: {
      common: '#9CA3AF',
      rare: '#3B82F6',
      epic: '#8B5CF6',
      legendary: '#F59E0B',
    },
  };

  console.log(`Characters with images: ${characters.filter(c => c.imageDataUrl).length}/${characters.length}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });

  const templatePath = path.join(ROOT, 'templates/box-net.html');
  await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0', timeout: 15000 });

  await page.evaluate((data) => {
    window.__PACK_DATA = data;
    if (typeof window.render === 'function') {
      window.render(data);
    }
  }, templateData);

  try {
    await page.waitForSelector('.rendered', { timeout: 5000 });
    console.log('Template rendered successfully');
  } catch {
    console.log('Warning: .rendered not found, waiting 2s...');
    await new Promise(r => setTimeout(r, 2000));
  }

  // Check what's on the page
  const pageInfo = await page.evaluate(() => {
    const faces = document.querySelectorAll('.face');
    const imgs = document.querySelectorAll('.face-char img');
    return {
      faceCount: faces.length,
      imgCount: imgs.length,
      bodyClasses: document.body.className,
      pageCount: document.querySelectorAll('.page').length,
    };
  });
  console.log('Page info:', JSON.stringify(pageInfo));

  const outPath = '/tmp/boxnet-preview.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Preview saved to: ${outPath}`);

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
