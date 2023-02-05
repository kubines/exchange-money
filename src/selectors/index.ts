/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type RootState, exchangesTableAdapter, exchangesConvertAdapter } from 'store'

export const loadingExchangesListSelector = (state: RootState) => state.exchanges.table.meta.loading

export const {
  selectById: tableCurrencySelector,
  selectIds: tableCurrencyIdsSelector,
  selectEntities: tableCurrencyEntitiesSelector,
  selectAll: tableAllCurrencySelector
} = exchangesTableAdapter.getSelectors((state: RootState) => state.exchanges.table.list)

export const convertListSelector = (state: RootState) => state.exchanges.convert.list
export const convertLoadingSelector = (state: RootState) => state.exchanges.convert.meta.loading
export const convertBaseCurrencySelector = (state: RootState) => state.exchanges.convert.baseCurrency

export const {
  selectById: convertCurrencySelector,
  selectIds: convertCurrencyIdsSelector
} = exchangesConvertAdapter.getSelectors((state: RootState) => state.exchanges.convert.list)
