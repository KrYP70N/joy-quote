import { getAuthor } from "@/lib/quote.lib"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const data = await getAuthor()
  return NextResponse.json(data)
}
