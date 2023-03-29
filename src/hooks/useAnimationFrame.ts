import { useEffect, useRef } from 'react'

export const useAnimationFrame = (callback: any) => {
  const requestRef = useRef<any>()
  const previousTimeRef = useRef<any>()

  const animate = (time: any) => {
    if (previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current

      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestRef.current)
  }) // Make sure the effect runs only once
}
