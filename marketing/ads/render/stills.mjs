import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
const [, , htmlFile, ad, ...times] = process.argv;
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlFile).href + "#export", { waitUntil: "networkidle0" });
for (const t of times) {
  await page.evaluate((a, s) => window.__render(a, s), Number(ad), Number(t));
  await page.screenshot({ path: `still-${ad}-${t}.png`, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
}
await browser.close(); console.log("ok");
