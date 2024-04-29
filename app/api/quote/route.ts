// import { run } from "@/lib/data.lib"
import { deleteQuote, getQuotes, postQuotes } from "@/lib/quote.lib"
import { validate } from "@/lib/user.lib"
import { headers } from "next/headers"
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
  const valid = await validate(headers())

  if(valid) {
    const request = await postQuotes(data)
    return NextResponse.json(request)
  } else {
    return NextResponse.json({
      message: 'Invalid token'
    }, {
      status: 403
    })
  }
}

export const DELETE = async (req: NextRequest) => {
  const {id} = await req.json()
  const valid = await validate(headers())

  if(valid) {
    const request = await deleteQuote(id)
  } else {
    return NextResponse.json({
      message: 'Invalid token'
    }, {
      status: 403
    })
  }
}