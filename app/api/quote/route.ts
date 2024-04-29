// import { run } from "@/lib/data.lib"
import { getQuotes, postQuotes } from "@/lib/quote.lib"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const param = req.nextUrl.searchParams
  const limit = Number(param.get('limit'))
  const page = Number(param.get('page')) - 1
  const data = await getQuotes(limit, page || 0)
  return NextResponse.json(data)
}

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const request = await postQuotes(data)
  return NextResponse.json(request)
  // const data = await postQuotes()
}