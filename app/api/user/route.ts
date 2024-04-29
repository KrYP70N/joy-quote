import { loginUser } from "@/lib/user.lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {email, password} = await req.json()
  console.log(email, password)
  if(!email || !password) {
    return NextResponse.json({
      message: 'Invalid input'
    }, {
      status: 202
    })
  }

  try {
    const data = await loginUser(email, password)
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    throw new Error("Error occur at login")
  }

  return NextResponse.json({email, password})
}

