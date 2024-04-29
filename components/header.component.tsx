import { roboto } from '@/ui/fonts'
import Link from 'next/link'
import path from 'path'
import NavLink from './nav-link.component'

export default function Header() {
  return (
    <header className={`${roboto.className} bg-gradient-to-r from-primary to-secondary m-4 p-4 rounded-lg overflow-hidden`}>
      <nav className="flex items-center">
        <h1 className="mr-10">
          <Link href="/" className="text-light text-2xl font-bold">Joy Quote</Link>
        </h1>
        <ul className="flex align-middle text-light">
          <li className="mr-7">
            <NavLink path="/" name="Quotes" />
          </li>
          <li className="mr-7">
            <NavLink path="/author" name="Author" />
          </li>
          <li className="mr-7">
            <NavLink path="/about" name="Abouts" />
          </li>
        </ul>
      </nav>
    </header>
  )
}