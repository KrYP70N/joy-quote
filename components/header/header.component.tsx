'use client'
import { roboto } from '@/ui/fonts'
import Link from 'next/link'
import NavLink from '../nav-link/nav-link.component'
import "./header.component.scss"
import { FaBook, FaBookBible, FaHeart, FaRegistered, FaUser } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useState } from 'react';
import { FaHistory, FaPenAlt } from 'react-icons/fa'


export default function Header() {
  const [drawer, setDrawer] = useState(false)

  function toggleDrawer() {
    setDrawer(!drawer)
  }

  return (
    <header className={`${roboto.className} bg-gradient-to-r from-primary to-secondary`}>
      <nav className="items-center mb-none">
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
      <nav className="secondary mb-none">
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

      <nav className="mb-flex mb-nav">
        <h1 className="mr-10">
          <Link href="/" className="text-light text-lg font-medium">Joy Quote</Link>
        </h1>
        <div className="accordion" onClick={toggleDrawer}>
          <IoIosMenu />
        </div>
      </nav>
      <div className={`drawer mb-flex ${drawer && "active"}`}>
        <div className="drawer-wrapper" onClick={toggleDrawer}></div>
        <section className="drawer-content">
          <ul className="text-light text-xl font-light">
            <li>
              <NavLink path="/" name="Quotes" icon={<FaBookBible />}/>
            </li>
            <li>
              <NavLink path="/author" name="Author" icon={<FaPenAlt />}/>
            </li>
            <li>
              <NavLink path="/about" name="Abouts" icon={<FaHistory />}/>
            </li>
            <li>
              <NavLink path="/favourite" name='Favourite' icon={<FaHeart />} />
            </li>
            <li>
              <NavLink path="/register" name='Register' icon={<FaBook />} />
            </li>
            <li>
              <NavLink path="/login" name='Login' icon={<FaUser />}/>
            </li>
            
            
          </ul>
        </section>
      </div>
    </header>
  )
}