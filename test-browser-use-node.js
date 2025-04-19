// test-browser-use-node.js
import { launchBrowser } from 'browser-use-node';

async function runTest() {
  console.log("Attempting to launch browser using browser-use-node...");
  let browser;
  try {
    // Basic launch attempt
    browser = await launchBrowser({ headless: true }); // Assuming headless option exists
    console.log("Browser launched successfully!");

    // Optional: Add a simple navigation
    // const page = await browser.newPage();
    // console.log("Navigating to example.com...");
    // await page.goto('https://example.com');
    // console.log("Navigation successful. Page title:", await page.title());
    // await page.close();

  } catch (error) {
    console.error("Error during browser-use-node test:", error);
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
      console.log("Browser closed.");
    }
  }
}

runTest();
