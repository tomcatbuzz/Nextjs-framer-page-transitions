import '@/styles/globals.css'
import '@/styles/styles.scss'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react";
import Preloader from '@/components/Preloader'

export default function App({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (
      async () => {
        // add locomotive//???????????????
          // const LocomotiveScroll = (await import('locomotive-scroll')).default
          // const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <>
    <div className='main'>
    {/* FOR INNER Transition comment Header here */}
      <div className='header'>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
        <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
    </div>
    </>
  )
  
}
