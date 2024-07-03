import { Fade, Slide, Zoom } from 'react-awesome-reveal';

export const SlideAnimation = ({children,direction,cascade, duration, delay}) => {
  return (
    <Slide direction={direction} triggerOnce  cascade={cascade} delay={delay}  duration={duration}>{children}</Slide>
  )
}

export const FadeAnimation = ({children,damping,delay,cascade}) => {
  return (
    <Fade  damping={damping} triggerOnce  cascade={cascade} delay={delay}>{children}</Fade>
  )
}

export const ZoomAnimation = ({children}) => {
  return (
    <Zoom triggerOnce >{children}</Zoom>
  )
}