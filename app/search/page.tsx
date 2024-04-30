'use client'
import Banner from "@/components/banner/banner.component";
import Container from "@/components/container/container.component";
import List from "@/components/list/list.component";
import { listService } from "@/services/list.service";
import { roboto } from "@/ui/fonts";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const kw = useSearchParams().get('kw') as string
  const [pageInfo, setPageInfo] = useState<{active?: number, total?: number, count?: number}>({})
  const [data, setData] = useState<any>([])
  const renderList = () => {
    listService((pageInfo.active || 0) + 1, 10, kw).then((res) => {
      setData([...data, ...res.data])

      setPageInfo({
        active: res.page, total: res.pages, count: res.count
      })
    })
  }

  useEffect(() => {
    renderList()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const isNearEnd = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearEnd && pageInfo.active !== pageInfo.total) {
        renderList()
        window.removeEventListener('scroll', handleScroll);
      }

    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageInfo])

  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Banner />
      <Container>
        <h2 className={`${roboto.className} text-xl mb-8`}>Found : {pageInfo.count || 0} related with <span className="bg-primary px-2 text-light rounded-lg">{kw}</span></h2>
        <List data={data} />
      </Container>
    </Suspense>
  )
}