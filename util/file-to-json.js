import fs from "node:fs/promises"
import path from "node:path";

export async function fileToJson(jsonPath){
    const safePath = path.resolve(jsonPath);

    const jsonString = await fs.readFile(safePath,"utf-8");
    const jsonObj    = JSON.parse(jsonString);
    return jsonObj;
}
