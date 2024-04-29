import { checkUser, resendVerification, verifyUser } from "@/lib/user.lib";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const param = req.nextUrl.searchParams
  const token = param.get('token')

  if(!token) {
    return NextResponse.json({
      message: 'Invalid input'
    }, {
      status: 202
    })
  }

  try {
    const process = await verifyUser(token)
    return NextResponse.json(process)
  } catch(error) {
    throw new Error('An error occur at resend verification.')
  }
}

