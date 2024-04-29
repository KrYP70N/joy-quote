import { mailTo } from "@/lib/mailer.lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = (req: NextRequest) => {
  mailTo('hsulei2610@gmail.com', 'Testing', 'Bae Bae go ayam chit dl <3')
  return NextResponse.json({
    message: 'success'
  })
}

