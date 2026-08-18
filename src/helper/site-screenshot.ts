import { chromium } from "playwright";

export async function siteScreenshot(url: string, screenshotPath: string) {
    const browser = await chromium.launch({
        headless: true,
    });

    const page = await browser.newPage({
        viewport: {
            width: 1920,
            height: 1080,
        },
    });

    await page.goto(url, {
        waitUntil: "networkidle",
    });

    await page.screenshot({
        path: screenshotPath,
        fullPage: true,
    });

    await browser.close();
}
