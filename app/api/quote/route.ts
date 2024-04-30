// import { run } from "@/lib/data.lib"
import { deleteQuote, getQuotes, postQuotes } from "@/lib/quote.lib"
import { validate } from "@/lib/user.lib"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const param = req.nextUrl.searchParams
  const limit = Number(param.get('limit'))
  const page = Number(param.get('page')) - 1
  try {
    const data = await getQuotes(limit, page || 0, param.get('search')?.toString())
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({
      data: [],
      page: 0,
      pages: 0,
      count: 0
    })
  }
  
}

export const POST = async (req: NextRequest) => {
  let data = await req.json()
  const valid: any = await validate(headers())

  data = data.map((item: any) => {
    return {
      ...item,
      email: valid.email,
      favourites: [],
      comments: []
    }
  })

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
    return NextResponse.json(request)
  } else {
    return NextResponse.json({
      message: 'Invalid token'
    }, {
      status: 403
    })
  }
}