'use client'

import { useEffect, useState } from "react"
import "./banner.component.scss"
import { bannerQuoteService, bannerService } from "@/services/banner.service"
import { roboto } from "@/ui/fonts"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import { isLogin } from "@/services/storage.service"


export default function Banner({height}: {height?: number}) {
  const [isLoading, setLoading] = useState(false)
  const [login] = useState(isLogin())
  const [history, setHistory] = useState<any[]>([])
  const [index, setIndex] = useState<number>(0)

  const nextBanner = async () => {
    if(index === history.length) {
      loadQuote()
    } else {
      setIndex(index + 1)
    }
  }

  const prevBanner = async () => {
    if(index !== 1) {
      setIndex(index - 1)
    }
  }

  const loadQuote = () => {
    setLoading(true)
    bannerQuoteService(Math.random()).then((quote: any) => {
      bannerService(Math.random()).then((url) => {
        setHistory([
          ...history,
          {
            ...quote,
            url
          }
        ])
        setLoading(false)
        setIndex(index + 1)
      })
    })
  }

  useEffect(() => {
    loadQuote()
  }, [])

  if(history.length > 0) {
    return (
      <section className="banner" style={{
        background: `url(${history[index - 1].url}) no-repeat center / cover, #333`,
        height: (height || 300) + 'px'
      }}>
        <div className="wrapper"></div>

        <div className="banner-content">
          <p className={`${roboto.className} font-light quote`}>{history[index - 1].quote}</p>
          <p className={`${roboto.className} font-bold author`}><span>{history[index - 1].author}</span> | {history[index - 1].date}</p>
        </div>

        <ul className={`indicator ${roboto.className} font-light text-2xl`}>
          <li className={`fav ${!login && 'disabled'}`}>
            <FaHeart />
          </li>
          <li onClick={nextBanner}>
            <GrLinkNext />
          </li>
          <li onClick={prevBanner} className={`${index === 1 && 'disabled'}`}>
            <GrLinkPrevious />
          </li>
        </ul>

        <div className={`loading ${isLoading && 'active'}`}>
          <div className="spanner"></div>
        </div>
      </section>
    )
  }
}