import { IncomingMessage } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { diff } from "@n1ru4l/json-patch-plus";
import { LRUCache } from "lru-cache";
import { z } from "zod/v4";

const cache = new LRUCache({
    max: 1000,
    ttl: 1000
})

const schema = z.object({
    name: z.string()
})

async function getDate() {
    const response = await fetch("http://localhost:3000/api")
    const data = await response.json()
    return schema.parse(data)
}

export function GET() {
    const headers = new Headers();
    headers.set('Connection', 'Upgrade');
    headers.set('Upgrade', 'websocket');
    return new Response('Upgrade Required', { status: 426, headers });
}

export async function SOCKET(
    client: WebSocket,
    request: IncomingMessage,
    server: WebSocketServer
  ) {
    console.log("A client connected");
    const date = await getDate()
    let message:any = {
        name: "234234"
    }
  
      client.send(JSON.stringify(message));
      cache.set("name", date)

      const interval = setInterval( async () => {
        console.info("cache", cache.get("name"))
        let data = cache.get("name") 
        if (!data) {
            data = await getDate()
            cache.set("name", data)
        }
        const delta = diff({left:message,right:data})

        if (delta) {
            client.send(JSON.stringify(delta))
            message = data
            console.info("cache2", cache.get("name"))
        }
      }, 300);
  
    client.on("close", () => {
      console.log("A client disconnected");
      clearInterval(interval);
    });
  }