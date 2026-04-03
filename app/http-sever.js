import http from "node:http"
import { getSendData } from "../service/get-send-data.js";

export class HttpSever{
    #DEFAULT_PORT = 3000;
    #DEFAULT_BASE_PATH = "./content/";
    #server = http.createServer(async (req,res) => this.#serverArrow(req,res));

    #basePath = this.#DEFAULT_BASE_PATH;
    #port     = this.#DEFAULT_PORT;

    async #serverArrow(req,res){
        console.log("【リクエスト】:",req.url)

        const sendData = await getSendData(req.url,this.#basePath);

        console.log("【レスポンス】:",sendData.code,sendData.type)

        res.writeHead(sendData.code,{"content-type":sendData.type});
        res.end(sendData.data);

        console.log("【処理終了】:","-----< end >-----")
    }

    constructor(port,basePath){
        this.setSeverPort(port);
        this.setBasePath(basePath);
    }

    setBasePath(basePath){
        this.#basePath = basePath ?? this.#DEFAULT_BASE_PATH;
    }
    setSeverPort(port){
        this.#port = port ?? this.#DEFAULT_PORT;
    }

    start(){
        this.#server.listen(this.#port);
        console.log("【サーバー起動】:",this.#port)
    }
    stop(){
        this.#server.close();
    }
}

