import React, { useEffect, useState, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadingExchangesListSelector, tableCurrencyIdsSelector } from 'selectors'
import { getTableListExchanges, type AppThunkDispatch } from 'store'
import { Select, Loader } from 'ui'

import { Row } from './Row'
import styles from './table.module.css'

export function Table (): ReactElement {
  const dispatch = useDispatch<AppThunkDispatch>()

  const [baseCurrency, setBaseCurrency] = useState('USD')

  const loadingExchangesList = useSelector(loadingExchangesListSelector)
  const listCodesExchanges = useSelector(tableCurrencyIdsSelector)

  useEffect(() => {
    void dispatch(getTableListExchanges({ baseCurrency }))
  }, [baseCurrency])

  return (
    <Loader loading={loadingExchangesList}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Select
            value={baseCurrency}
            list={listCodesExchanges}
            onChange={(e) => { setBaseCurrency(e) }}
          />
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
