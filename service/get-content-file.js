import path from "node:path";
import fs from "node:fs/promises";
import {extensionToMIME} from "../util/extension-to-mime.js";

export async function getContentFile(filePath){
    const fileData = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType = extensionToMIME(ext);

    return {
        data:fileData,
        type:contentType
    };
}