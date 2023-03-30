import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Bounce } from '../components/bounce/Bounce'
import { Button } from '../components/button/Button'
import { Square } from '../components/square/Square'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { useWindowSize } from '../hooks/useWindowSize'
import { animation } from '../utils/animationFunc'

import style from './App.module.css'

export const App = () => {
  const refSquare1 = useRef<HTMLDivElement | null>(null)
  const refSquare2 = useRef<HTMLDivElement | null>(null)
  const refCircle = useRef<HTMLDivElement | null>(null)

  const { width, height } = useWindowSize()

  const [timer] = useState(5)

  const [measure, setMeasure] = useState({
    y1: 0,
    x1: 0,
    y2: 0,
    x2: 0,
  })

  const [distance, setDistance] = useState<undefined | number>(undefined)

  const [positionCircle, setPositionCircle] = useState<undefined | any>({
    top: undefined,
    left: undefined,
  })
  const [currPosCircle, setCurrPosCircle] = useState<undefined | any>({
    top: positionCircle.top,
    left: positionCircle.left,
  })

  const [isStartAnim, setIsStartAnim] = useState(false)

  useEffect(() => {
    animation(refCircle.current, {
      start: {
        top: currPosCircle.top,
        left: currPosCircle.left,
      },
      finish: { top: measure.y2 + 50, left: measure.x2 + 50 },
    })
  }, [width, height])

  useEffect(() => {
    if (distance && refSquare1.current) {
      setPositionCircle({
        left: distance - (measure.x1 + refSquare1.current?.getBoundingClientRect().width / 2),
        top: measure.y1 + refSquare1.current?.getBoundingClientRect().width / 2,
      })
    }
  }, [distance, measure.y1, measure.y2])

  useEffect(() => {
    if (isStartAnim && refCircle.current && refSquare1.current) {
      animation(refCircle.current, {
        start: {
          top: positionCircle.top,
          left: positionCircle.left,
        },
        finish: {
          top: measure.y2 + refSquare1.current?.getBoundingClientRect().width / 2,
          left: measure.x2 + refSquare1.current?.getBoundingClientRect().width / 2,
        },
      })
      setIsStartAnim(false)
    }
  }, [isStartAnim, measure])

  useEffect(() => {
    if (refCircle.current) {
      refCircle.current.style.left = `${positionCircle.left}px`
      refCircle.current.style.top = `${positionCircle.top}px`
    }
  }, [positionCircle.left, positionCircle.top, refCircle.current])

  useEffect(() => {
    setDistance(measure.x2 - measure.x1)
  }, [measure, width, height])

  const render = useCallback(() => {
    if (refSquare1.current && refSquare2.current) {
      setMeasure({
        y1: refSquare1.current.getBoundingClientRect().y,
        x1: refSquare1.current.getBoundingClientRect().x,
        y2: refSquare2.current.getBoundingClientRect().y,
        x2: refSquare2.current.getBoundingClientRect().x,
      })
    }
  }, [refSquare1.current, refSquare2.current, width, height])

  useAnimationFrame(render)

  const pushBounceHandler = () => {
    setIsStartAnim(true)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.squares_block}>
        <Square
          ref={refSquare1}
          titleNum={'1'}
          className={style.squares__block_square}
          id={'square'}
        />
        <Bounce ref={refCircle} id={'circle'} />
        <Square ref={refSquare2} titleNum={'2'} id={'square2'} />
      </div>
      <Button title={'start'} time={timer} onClick={pushBounceHandler} />
    </div>
  )
}
