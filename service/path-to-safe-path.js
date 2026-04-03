import path from "node:path";

export function pathToSafePath(reqPath,basePath){
    const baseFllPath = path.resolve(basePath);
    const Path        = path.join(baseFllPath,reqPath);
    const safePath    = path.normalize(Path);

    if(!safePath.startsWith(baseFllPath)) return baseFllPath;

    return safePath;
}