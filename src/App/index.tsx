import React, { type ReactElement, Suspense } from 'react'

import { Convert, Table } from 'components'

import styles from './app.module.css'

export default function App (): ReactElement {
  return (
    <Suspense>
    <div className={styles.container}>
      <div className={styles.convert_container}>
        <Convert />
      </div>
      <div className={styles.table_container}>
        <Table />
      </div>
    </div>
    </Suspense>
  )
}
