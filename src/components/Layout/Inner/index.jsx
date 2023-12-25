import { motion } from "framer-motion"
import Link from "next/link";
import { slide, opacity, perspective } from './anim';

export default function Inner({children}) {

  const anim = (variants) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants
    }
  }

  

  return (
    <div className="inner">
    
    <motion.div {...anim(slide)} className="slide" />
    <motion.div {...anim(perspective)} className="page">
      <motion.div {...anim(opacity)}>
        <div className='header'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </div>
        {children}
      </motion.div>
    </motion.div>
    </div>
  )
}