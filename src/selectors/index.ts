/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSelector } from '@reduxjs/toolkit'
import { type RootState, exchangesTableAdapter, exchangesConvertAdapter } from 'store'

// table
export const loadingExchangesListSelector = (state: RootState) => state.exchanges.table.meta.loading
export const tableSortBySelector = (state: RootState) => state.exchanges.table.sortBy

export const {
  selectById: tableCurrencySelector,
  selectIds: tableCurrencyIdsSelector,
  selectEntities: tableCurrencyEntitiesSelector,
  selectAll: tableAllCurrencySelector
} = exchangesTableAdapter.getSelectors((state: RootState) => state.exchanges.table.list)

export const sortedTableIdsSelector = createSelector(
  tableCurrencyIdsSelector,
  tableCurrencyEntitiesSelector,
  (state: RootState) => state.exchanges.table.sortBy,
  (ids, entities, sortBy) => (
    [...ids].sort((a, b) => {
      if (sortBy === 'asc') return Number(entities[a]?.value) - Number(entities[b]?.value)
      if (sortBy === 'desc') return Number(entities[b]?.value) - Number(entities[a]?.value)

      return 0
    })
  )
)

// convert
export const convertListSelector = (state: RootState) => state.exchanges.convert.list
export const convertLoadingSelector = (state: RootState) => state.exchanges.convert.meta.loading
export const convertBaseCurrencySelector = (state: RootState) => state.exchanges.convert.baseCurrency

export const {
  selectById: convertCurrencySelector,
  selectIds: convertCurrencyIdsSelector
} = exchangesConvertAdapter.getSelectors((state: RootState) => state.exchanges.convert.list)
