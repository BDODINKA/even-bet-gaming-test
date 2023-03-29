import React, { forwardRef, StyleHTMLAttributes } from 'react'

import styles from './Bounce.module.css'

export const Bounce = forwardRef<HTMLDivElement, StyleHTMLAttributes<string>>(
  ({ style, id }, ref) => {
    return <div ref={ref} className={styles.bounce} style={style} id={id}></div>
  }
)
