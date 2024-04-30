import { randomQuote } from "@/lib/quote.lib"
import { NextResponse } from "next/server"

export const POST = async () => {
  const request = await randomQuote()
  return NextResponse.json(request)
}