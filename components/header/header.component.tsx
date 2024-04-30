import { roboto } from '@/ui/fonts'
import Link from 'next/link'
import NavLink from '../nav-link/nav-link.component'
import "./header.component.scss"
import { FaBook, FaHeart, FaRegistered, FaUser } from "react-icons/fa6";


export default function Header() {
  return (
    <header className={`${roboto.className} bg-gradient-to-r from-primary to-secondary`}>
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
      <nav className="secondaryy">
        <ul className="flex align-middle text-light text-sm font-medium">
          <li className="mr-7">
            <NavLink path="/favourite" name='Favourite' icon={<FaHeart />} />
          </li>
          <li className="mr-7">
            <NavLink path="/register" name='Register' icon={<FaBook />} />
          </li>
          <li>
            <NavLink path="/login" name='Login' icon={<FaUser />}/>
          </li>
        </ul>
      </nav>
    </header>
  )
}