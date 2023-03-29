import { IAnimation } from '../interface/IAnimation'

export const animation = (elem: HTMLElement | null, style: IAnimation) => {
  if (elem) {
    elem.style.visibility = `visible`
    const animation = elem.animate(
      [
        {
          top: `${style.start.top}px`,
          left: `${style.start.left}px`,
        },

        {
          top: `${style.finish.top}px`,
          left: `${style.finish.left}px`,
        },
      ],
      2000
    )

    animation.addEventListener('finish', () => {
      elem.style.top = `${style.start.top}px`
      elem.style.left = `${style.start.left}px`
      elem.style.visibility = `hidden`
    })
  }
}
