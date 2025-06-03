import { connection } from "next/server";
import { WsClient } from "./ws";
import { Suspense } from "react";

export default  function Home() {

  return (
   <div className="flex flex-col items-center gap-4">
    <h1>Hello World</h1>

   </div>
  );
}
