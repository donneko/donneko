import { siteScreenshot } from "../helper/site-screenshot.js";
import { projects } from "../data/projects.ts";
import { fixScreenshotPath } from "../helper/fix-screenshot-path.js";

const screenshots = projects.map(({ hasScreenshot, src }) => {
    if (hasScreenshot) return siteScreenshot(src, `public/${fixScreenshotPath(src)}`);
});
await Promise.all(screenshots);
