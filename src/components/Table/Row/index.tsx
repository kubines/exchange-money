import React, { type ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { type RootState } from 'store'
import { tableCurrencySelector } from 'selectors'

import { type RowProps } from './types'
import styles from './row.module.css'

export function Row ({ code, onClick }: RowProps): ReactElement {
  const currency = useSelector((state: RootState) => tableCurrencySelector(state, code))

  return (
    <div
      className={styles.row}
      onClick={onClick}
    >
        <div
          className={styles.col}
        >
          {currency?.code}
        </div>
        <div
          className={styles.col}
        >
          {currency?.value}
        </div>
    </div>
  )
}
