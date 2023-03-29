import React, { forwardRef } from 'react'

import style from './Square.module.css'

type content = {
  titleNum: string
  className?: string
  id?: string
  children?: React.ReactNode
  push?: boolean
}

export const Square = forwardRef<HTMLDivElement, content>((props, ref) => {
  const { className, titleNum, id, push, children } = props

  const finalClass = className ? `${style.wrapper} ${className}` : style.wrapper

  return (
    <div className={finalClass} id={id} ref={ref}>
      {push ? children : titleNum}
    </div>
  )
})
