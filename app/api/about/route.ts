import { readData } from "@/lib/data.lib"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const data = await readData('quote')
  console.log(data)
  return NextResponse.json(data)
}