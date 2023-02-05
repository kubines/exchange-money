import React, { useCallback, type ReactElement } from 'react'

import styles from './input.module.css'
import { type InputProps } from './types'

export function Input ({ value, onChange }: InputProps): ReactElement {
  const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      onChange?.(Number(e.target.value))
    }
  }, [])

  return (
    <input
        className={styles.input}
        value={value}
        type="text"
        pattern="[0-9]*"
        onChange={(e) => { change(e) }}
    />
  )
}
