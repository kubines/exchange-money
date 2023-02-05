import React, { type PropsWithChildren, type ReactElement } from 'react'

import styles from './button.module.css'
import { type ButtonProps } from './types'

export function Button ({ children, onClick }: PropsWithChildren<ButtonProps>): ReactElement {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
