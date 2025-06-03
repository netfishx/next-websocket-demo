import "./globals.css";
import { Suspense } from "react";
import { WsClient } from "./ws";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <WsClient />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
