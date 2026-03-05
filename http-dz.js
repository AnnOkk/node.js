import http from 'node:http'
import dotenv from 'dotenv'
import * as url from "node:url"; //!

dotenv.config() // возьми файл дотэнв и используй переменную оттуда(значение)

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

     let url = new URL(req.url,'http://localhost');

    const name = url.searchParams.get('name');
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    if (req.url) {
        res.write(`<h1> Hello ${name}!</h1>`)
    }
    res.end();
})



server.listen(port, () => {
    console.log(`Server listening on port ${port}. Press Ctrl+C to quit`)
})

