import { roboto } from "@/ui/fonts"
import "./card.component.scss"

export default function Card({data}: {data: any}) {
  return (
    <div className="card">
      <p className={`${roboto.className} font-normal text-md`}>{data.quote}</p>
      <br/>
      <p className={`${roboto.className} font-light text-sm`}>{data.author} | {data.date}</p>
    </div>
  )
}