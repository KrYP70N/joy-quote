'use client'
import Banner from "@/components/banner/banner.component";
import Container from "@/components/container/container.component";
import List from "@/components/list/list.component";
import { listService } from "@/services/list.service";
import { roboto } from "@/ui/fonts";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageInfo, setPageInfo] = useState<{active?: number, total?: number}>({})
  const [data, setData] = useState<any>([])
  const renderList = () => {
    listService((pageInfo.active || 0) + 1, 10).then((res) => {
      setData([...data, ...res.data])

      setPageInfo({
        active: res.page, total: res.pages
      })
    })
  }

  useEffect(() => {
    renderList()
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
          console.log('SW registered: ', registration);
        }).catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
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
    <>
      <Banner height={500}/>
      <Container>
        <h2 className={`${roboto.className} text-xl mb-8`}>Quotes Around The Feed</h2>
        <List data={data} />
      </Container>
    </>
  )
}