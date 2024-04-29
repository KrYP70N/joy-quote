import { checkUser, resendVerification } from "@/lib/user.lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {email, token} = await req.json()
  const hasUser = await checkUser(email)

  if(!email || !token) {
    return NextResponse.json({
      message: 'Invalid input'
    }, {
      status: 202
    })
  }

  try {
    const process = await resendVerification(email, token)
    return NextResponse.json(process)
  } catch(error) {
    throw new Error('An error occur at resend verification.')
  }
}

