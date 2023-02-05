import React, { useState, useEffect, type ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TbArrowsRightLeft } from 'react-icons/tb'

import { convertLoadingSelector, convertCurrencyIdsSelector, convertCurrencySelector } from 'selectors'
import { getConvertListExchanges, type AppThunkDispatch, type RootState } from 'store'
import { Select, Input, Loader } from 'ui'

import styles from './convert.module.css'

export function Convert (): ReactElement {
  const dispatch = useDispatch<AppThunkDispatch>()

  const [numMoney, setNumMoney] = useState<number>(1)
  const [firstSelect, setFirstSelect] = useState('USD')
  const [secondSelect, setSecondSelect] = useState('EUR')

  const convertCurrency = useSelector((state: RootState) => convertCurrencySelector(state, secondSelect))
  const convertCurrencyIds = useSelector(convertCurrencyIdsSelector)
  const loading = useSelector(convertLoadingSelector)

  const changeSelect: VoidFunction = () => {
    setFirstSelect(secondSelect)
    setSecondSelect(firstSelect)
  }

  useEffect(() => {
    void dispatch(getConvertListExchanges({ baseCurrency: firstSelect }))
  }, [firstSelect])

  return (
    <Loader loading={loading}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Input
          value={numMoney}
          onChange={(val: number) => { setNumMoney(val) }}
        />
        <Select
          value={firstSelect}
          onChange={(e) => { setFirstSelect(e) }}
          list={convertCurrencyIds}
        />
        <div className={styles.arrows} onClick={changeSelect}>
          <TbArrowsRightLeft />
        </div>
        <Select
          value={secondSelect}
          onChange={(e) => { setSecondSelect(e) }}
          list={convertCurrencyIds}
        />
      </div>
      <div className={styles.convertValue}>
        {`${(numMoney * Number(convertCurrency?.value)).toFixed(2)} ${firstSelect}`}
      </div>
    </div>
    </Loader>
  )
}
