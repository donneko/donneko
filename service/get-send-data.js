import {getErrorPagePath} from "./get-error-page-path.js"
import {getContentFile} from "./get-content-file.js"
import {pathToSafePath} from "./path-to-safe-path.js"

export async function getSendData(requestPath,InputBasePath){
    const basePath = InputBasePath;

    async function getErrorPage(errorPagePath){
        try {
            const safePath = pathToSafePath(errorPagePath,basePath);

            const contentData = await getContentFile(safePath);
            return  {...contentData,code:404};
        } catch {
            const errorData = {
                data:"404:ページが存在しません。",
                type:"text/plain"
            }
            return  {...errorData,code:404};
        }
    }
    async function getContentPage(path){
        try {
            const convertPath = pathToSafePath(path,basePath);
            const safePath = (path.length === 0 || (/\/+$/g).test(path)) ? pathToSafePath(`${path}/index.html`,basePath) : convertPath;
            const contentData = await getContentFile(safePath);
            return {...contentData,code:200};
        } catch {
            const errorPagePath = getErrorPagePath(404);
            return await getErrorPage(errorPagePath);
        }
    }

    return getContentPage(requestPath);
}