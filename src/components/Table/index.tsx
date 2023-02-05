import React, { useEffect, useCallback, useState, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { loadingExchangesListSelector, sortedTableIdsSelector } from 'selectors'
import { getTableListExchanges, sortTable, type AppThunkDispatch } from 'store'
import { Select, Loader } from 'ui'

import { Row } from './Row'
import styles from './table.module.css'

const mapSort = {
  None: null,
  Ascending: 'asc',
  Descending: 'desc'
}

export function Table (): ReactElement {
  const dispatch = useDispatch<AppThunkDispatch>()

  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [sort, setSort] = useState<keyof typeof mapSort>('None')

  const loadingExchangesList = useSelector(loadingExchangesListSelector)
  const listCodesExchanges = useSelector(sortedTableIdsSelector)

  const onChangeSort = useCallback((val: keyof typeof mapSort) => {
    setSort(val)
    dispatch(sortTable(mapSort[val]))
  }, [])

  useEffect(() => {
    void dispatch(getTableListExchanges({ baseCurrency }))
  }, [baseCurrency])

  return (
    <Loader loading={loadingExchangesList}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.col}>
            <Select
              value={baseCurrency}
              list={listCodesExchanges}
              onChange={(e) => { setBaseCurrency(e) }}
            />
          </div>
          <div className={clsx(styles.col, styles.col_sort)}>
            Sort:
            <Select
              value={sort}
              list={['None', 'Ascending', 'Descending']}
              onChange={(e) => { onChangeSort(e) }}
            />
          </div>
        </div>
        <div className={styles.row_wrap}>
          {listCodesExchanges?.map((code) => (
            <Row
              key={code}
              code={code}
              onClick={() => { setBaseCurrency(String(code)) }}
            />
          ))}
        </div>
      </div>
    </Loader>
  )
}
