import { roboto } from "@/ui/fonts";
import { ReactNode } from "react";

export default function Container({children, attr}: {children?: ReactNode, attr?: string}) {
  return (
      <div className={`${roboto.className} ${attr} m-4 p-4 rounded-lg overflow-hidden`}>{children}</div>
  )
}