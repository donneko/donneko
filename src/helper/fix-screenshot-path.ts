export function fixScreenshotPath(src: string) {
    const url = new URL(src);
    const fixUrl = `${url.hostname}${url.pathname}`.replaceAll(".", "-").replaceAll("/", "-");

    return `screenshot/${fixUrl}.jpeg`;
}
