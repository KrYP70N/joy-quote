import { randomQuote } from "@/lib/quote.lib"
import { NextResponse } from "next/server"

export const GET = async () => {
  const request = await randomQuote()
  return NextResponse.json(request)
}