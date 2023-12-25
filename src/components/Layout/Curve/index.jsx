import { motion } from 'framer-motion';
import { text, curve, slide } from './anim';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const routes = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact"
}

const anim = (variants) => {
  return {
      variants,
      initial: "initial",
      animate: "enter",
      exit: "exit"
  }
}

export default function Curve({children}) {
  const router = useRouter
  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  })

  useEffect( () => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    resize()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className='page curve'>
      <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'></div>
      <motion.p className='route' {...anim(text)}>
        {routes[router.route]}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions}/>}
      {children}
    </div>
  )
}

const SVG = ({width, height}) => {

  const initialPath =`
  M0 300
  Q${width / 2} 0 ${width} 300
  L${width} ${height + 300}
  Q${width / 2} ${height + 600} 0 ${height + 300}
  L0 0
  `
  const targetPath =`
  M0 300
  Q${width / 2} 0 ${width} 300
  L${width} ${height}
  Q${width / 2} ${height} 0 ${height}
  L0 0
  `

  // const curve = {
  //   initial: {
  //     d: initialPath
  //   },
  //   enter : {
  //     d: targetPath,
  //     transition: {
  //       duration: .75,
  //       delay: 0.3,
  //       ease: [0.76, 0, 0.24, 1]
  //     }
  //   },
  //   exit: {
  //     d: initialPath,
  //     transition: {
  //       duration: .75,
  //       ease: [0.76, 0, 0.24, 1]
  //     }
  //   }
  // }
  // const slide = {
  //   initial: {
  //     top: "-300px"
  //   },
  //   enter: {
  //     top: "-100vh",
  //     transition: {
  //       duration: .75,
  //       delay: 0.3,
  //       ease: [0.76, 0, 0.24, 1]
  //     },
  //     transitionEnd: {
  //       top: "100vh"
  //     }
  //   },
  //   exit: {
  //     top: "-300px",
  //     transition: {
  //       duration: .75,
  //       ease: [0.76, 0, 0.24, 1]
  //     }
  //   }
  // }

  return (
    <motion.svg {...anim(slide)}>
      <motion.path {...anim(curve(initialPath, targetPath))}></motion.path>
    </motion.svg>
  )
}