import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

import { type InitialState, type GetListExchanges, type Currency, type GetListExchangesRes } from './types'

export const exchangesTableAdapter = createEntityAdapter({
  selectId: (item: Currency) => item.code
})

export const exchangesConvertAdapter = createEntityAdapter({
  selectId: (item: Currency) => item.code
})

export const initialState: InitialState = {
  table: {
    list: exchangesTableAdapter.getInitialState(),
    baseCurrency: 'USD',
    meta: {
      loading: false,
      loaded: false,
      error: false
    }
  },
  convert: {
    baseCurrency: 'USD',
    list: exchangesConvertAdapter.getInitialState(),
    meta: {
      loading: false,
      loaded: false,
      error: false
    }
  }
}

export const getTableListExchanges = createAsyncThunk('exchanges/getListExchanges', async ({ baseCurrency }: GetListExchanges) => {
  return await axios<GetListExchangesRes>('https://api.currencyapi.com/v3/latest', {
    method: 'GET',
    params: {
      apikey: process.env.REACT_APP_API_KEY,
      currencies: '',
      base_currency: baseCurrency
    }
  })
})

export const getConvertListExchanges = createAsyncThunk('exchanges/getConvertListExchanges', async ({ baseCurrency }: GetListExchanges) => {
  return await axios<GetListExchangesRes>('https://api.currencyapi.com/v3/latest', {
    method: 'GET',
    params: {
      apikey: process.env.REACT_APP_API_KEY,
      currencies: '',
      base_currency: baseCurrency
    }
  })
})

export const exchanges = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTableListExchanges.pending, (state) => {
        state.table.meta = {
          loading: true,
          loaded: false,
          error: false
        }
      })
      .addCase(getTableListExchanges.fulfilled, (state, { payload, meta }) => {
        exchangesTableAdapter.upsertMany(state.table.list, payload.data.data)
        state.table.meta = {
          loading: false,
          loaded: true,
          error: false
        }
        state.table.baseCurrency = meta.arg.baseCurrency
      })
      .addCase(getTableListExchanges.rejected, (state) => {
        state.table.meta = {
          loading: false,
          loaded: false,
          error: true
        }
      })
      .addCase(getConvertListExchanges.pending, (state) => {
        state.convert.meta = {
          loading: true,
          loaded: false,
          error: false
        }
      })
      .addCase(getConvertListExchanges.fulfilled, (state, { payload, meta }) => {
        exchangesConvertAdapter.upsertMany(state.convert.list, payload.data.data)
        state.convert.meta = {
          loading: false,
          loaded: true,
          error: false
        }
        state.convert.baseCurrency = meta.arg.baseCurrency
      })
      .addCase(getConvertListExchanges.rejected, (state) => {
        state.convert.meta = {
          loading: false,
          loaded: false,
          error: true
        }
      })
  }
})

export default exchanges.reducer
