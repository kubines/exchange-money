/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type RefObject, useCallback, useEffect, useRef } from 'react'

export const useClickOutside = (callback: VoidFunction): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: any) => {
    if (ref.current != null &&
      !ref.current.contains(e.target) &&
      !(e.target.id?.includes('react-select')) &&
      !e.target.id?.includes('kg-nds-message')) {
      callback()
    }
  }, [ref, callback])

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return ref
}
