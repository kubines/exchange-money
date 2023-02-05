import React, { type ReactElement, type PropsWithChildren } from 'react'

import styles from './loader.module.css'

export function Loader ({ children, loading }: PropsWithChildren<{ loading?: boolean }>): ReactElement {
  return (
    <div className={styles.container}>
      {Boolean(loading) &&
        <>
          <div className={styles.wrap}>
          </div><span className={styles.loader} />
        </>
      }
      {children}
    </div>
  )
}
