'use client'
import { FaSearch } from 'react-icons/fa'
import './searchBar.component.scss'
import { useState } from 'react'

export const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = () => {
    window.location.href =  `/search?kw=${keyword}`
  }
  return (
    <div className="search">
      <input type="text" placeholder="search ..." onKeyUp={(e: any) => {
        setKeyword(e.target.value)
      }}/>
      <button onClick={() => handleSearch()}><FaSearch /></button>
    </div>
  )
}