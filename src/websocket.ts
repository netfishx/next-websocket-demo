'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { patch } from '@n1ru4l/json-patch-plus';

function useWS(url: string) {
    const ref = useRef<WebSocket>(null);
    const [, update] = useState(0);
  
    useEffect(() => {
      if (ref.current) return;
      const socket = new WebSocket(url);
      ref.current = socket;
      update((p) => p + 1);
  
      return () => socket.close();
    }, []);
  
    return ref.current;
  }

export function useWebSocket(url: string) {
  const socket = useWS(url);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    socket?.addEventListener(
      'message',
      async (event) => {
        const payload =
          typeof event.data === 'string' ? event.data : await event.data.text();
        console.log('Incoming message:', payload);
        setMessage(prev => prev ? JSON.stringify(patch({left:JSON.parse(prev),delta:JSON.parse(payload)})) : payload);
      },
      controller,
    );

    socket?.addEventListener(
      'error',
      (event) => {
        console.error(event);
      },
      controller,
    );

    socket?.addEventListener(
      'close',
      (event) => {
        if (event.wasClean) return;
        const content = 'The connection to the server was closed unexpectedly';
        console.error(content);
      },
      controller,
    );

    return () => controller.abort();
  }, [socket]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!socket || socket.readyState !== socket.OPEN) return;
      console.log('Outgoing message:', message);
      socket.send(message);
    },
    [socket],
  );

  return [message, sendMessage] as const;
}