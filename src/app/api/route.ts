import { NextResponse } from "next/server";

export function GET() {
    console.log("GET", new Date().toISOString())
    return NextResponse.json({
        date: new Date().toISOString(),
        name: "John Doe",
    })
}