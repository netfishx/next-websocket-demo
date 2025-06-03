'use client'

import { use } from "react";
import { useWebSocket } from "@/websocket";
import { Blob } from "buffer";



export function WsClient() {
    const [message, sendMessage] = useWebSocket("ws://localhost:3000/ws");
   
    return (
        <div>
 
            <p>Last message: {message}</p>
        </div>  
    );
}   