import { getBanner } from "@/lib/banner.lib";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const url = await getBanner()
    return NextResponse.json({
      url
    })
  } catch (error) {
    throw new Error("An error occur at fetching banner image")
  }
}