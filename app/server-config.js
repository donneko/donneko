import {fileToJson} from "../util/file-to-json.js"

const configJsonPath = {
    errorPagePath:`./data/error-page.json`,
    mimeData     :"./data/mime-data.json"
}

export const SERVER_CONFIG = Object.freeze({
    errorPagePath:Object.freeze( await fileToJson(configJsonPath.errorPagePath)),
    mimeData     :Object.freeze( await fileToJson(configJsonPath.mimeData)),
});
