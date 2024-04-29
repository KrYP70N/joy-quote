import { setFavourite } from "@/lib/quote.lib";
import { validate } from "@/lib/user.lib";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const {id} = await req.json()
  const valid: any = await validate(headers())
  if(!valid) {
    return NextResponse.json({
      message: 'Unauthorize'
    }, {
      status: 403
    })
  }

  if(!id) {
    return NextResponse.json({
      message: 'Invalid input'
    }, {
      status: 202
    })
  }

  try {
    const patch = await setFavourite(id, valid.email)
    return NextResponse.json(patch)
  } catch(error) {
    throw new Error("Error occur at set favourite post")
  }
}