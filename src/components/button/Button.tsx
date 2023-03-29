import React, { FC, useEffect, useState } from 'react'

import style from './Button.module.css'

export const Button: FC<{ time: number; title: string; onClick?: () => void }> = ({
  time,
  title,
  onClick,
}) => {
  const [timer, setTimer] = useState(false)
  const [counter, setCounter] = useState(time)

  useEffect(() => {
    const timerID = setInterval(() => set(counter - 1), 1000)

    return () => clearInterval(timerID)
  }, [counter])

  const set = (counter: number) => {
    if (counter <= 0) {
      setTimer(false)
      setCounter(time)
    } else {
      setCounter(counter)
    }
  }

  const onClickHandler = () => {
    setTimer(true)
    onClick && onClick()
  }

  return (
    <button onClick={onClickHandler} className={style.btn} disabled={timer}>
      {!timer ? title : counter}
    </button>
  )
}
