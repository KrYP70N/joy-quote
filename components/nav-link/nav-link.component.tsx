'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export interface NAV_LINK {
  path: string
  name: string
  icon?: ReactNode
}

export default function NavLink({path, name, icon}: NAV_LINK) {
  const pathname = usePathname()
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <span className={clsx('hover:opacity-50 flex items-center',{
        'text-active font-bold': isActive
      })}>{name} <i className="ml-2">{icon}</i></span>
    </Link>
  )
}