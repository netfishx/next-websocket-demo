import { IncomingMessage } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { diff } from "@n1ru4l/json-patch-plus";

export function GET() {
    const headers = new Headers();
    headers.set('Connection', 'Upgrade');
    headers.set('Upgrade', 'websocket');
    return new Response('Upgrade Required', { status: 426, headers });
}

export function SOCKET(
    client: WebSocket,
    request: IncomingMessage,
    server: WebSocketServer
  ) {
    console.log("A client connected");
    let message = {
        a: new Date().toISOString()
      }
  
      client.send(JSON.stringify(message));



      const interval = setInterval(() => {
        const info = {a:new Date().toISOString()}
        client.send(JSON.stringify(diff({left:message,right:info})));
        message = info
      }, 1000);
  
    client.on("close", () => {
      console.log("A client disconnected");
      clearInterval(interval);
    });
  }