'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface NAV_LINK {
  path: string
  name: string
}

export default function NavLink({path, name}: NAV_LINK) {
  const pathname = usePathname()
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <span className={clsx('hover:opacity-50',{
      'text-active font-bold': isActive
    })}>{name}</span>
    </Link>
  )
}