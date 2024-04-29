import { checkUser, registerUser } from "@/lib/user.lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {email, password} = await req.json()
  const hasUser = await checkUser(email)

  if(!email || !password) {
    return NextResponse.json({
      message: 'Invalid input'
    }, {
      status: 202
    })
  }

  if(!hasUser) {
    const process = await registerUser(email, password)
    return NextResponse.json(process)
  } else {
    return NextResponse.json({
      message: 'user alread exist'
    }, {
      status: 409
    })
  }
}

