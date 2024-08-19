import fs from "fs";
import http from "http";

// import { cwebp, gwebp } from "towebp"

const postsDir = "../../src/posts";

if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

const server = http.createServer();

server.on("request", async (request, response) => {
  const url = new URL(request.url ?? "", `http://${request.headers.host}`);

  if (url.pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World");
  }
  if (url.pathname === "/new" && request.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const body: any[] = [];
      request
        .on("data", (chunk) => body.push(chunk))
        .on("end", () => resolve(JSON.parse(Buffer.concat(body).toString())))
        .on("error", reject);
    });
  }
  if (url.pathname === "/upload") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Upload");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
