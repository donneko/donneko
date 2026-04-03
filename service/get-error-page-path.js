import { SERVER_CONFIG } from "../app/server-config.js";

export function getErrorPagePath(code){
    return SERVER_CONFIG.errorPagePath[code];
}
