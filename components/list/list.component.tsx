'use client'
import "./list.component.scss"
import Card from "../card/card.component";

export default function List({data}: {data: any[]}) {

  return (
    <section className="quote-list">
      {
        data.map((item, id) => <Card key={id} data={item}/>)
      }
    </section>
  )
}