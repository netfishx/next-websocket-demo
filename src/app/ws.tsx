'use client'

import { use } from "react";
import { useWebSocket } from "@/websocket";
import { Blob } from "buffer";



export function WsClient() {
    const [message, sendMessage] = useWebSocket("ws://localhost:3000/ws");
   
    return (
        <div>
            <button onClick={() => sendMessage(JSON.stringify({a:123123}))}>Send Message</button>
            <p>Last message: {JSON.parse(message ?? "{}")?.a}</p>
        </div>  
    );
}   