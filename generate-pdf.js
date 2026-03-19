const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:3077", { waitUntil: "networkidle0", timeout: 60000 });

  // Remove the sticky nav and make the scrollable div full height
  await page.evaluate(() => {
    // Remove nav bar
    const nav = document.querySelector("div > div:first-child");
    if (nav && nav.style.borderBottom) nav.remove();

    // Make the scroll container full height (not 100vh constrained)
    const root = document.querySelector("div[style]");
    if (root) {
      root.style.height = "auto";
      root.style.overflow = "visible";
    }
    const scrollDiv = document.querySelector("[style*='overflowY']") || document.querySelector("div[style*='overflow']");
    if (scrollDiv) {
      scrollDiv.style.height = "auto";
      scrollDiv.style.overflow = "visible";
      scrollDiv.style.flex = "none";
    }
  });

  // Wait for images to load
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        }))
    );
  });

  await new Promise(r => setTimeout(r, 2000));

  await page.pdf({
    path: "C:\\Users\\Uddit\\Downloads\\Celebso-Proposal-v2.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
    preferCSSPageSize: false,
  });

  console.log("PDF saved to C:\\Users\\Uddit\\Downloads\\Celebso-Technical-Proposal.pdf");
  await browser.close();
})();
