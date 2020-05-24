import { useState } from 'react'

export const useIntersectionObserver = (
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const [observer] = useState(
    new IntersectionObserver((entries): void => {
      console.log(entries)
    }, options)
  )

  return observer
}
