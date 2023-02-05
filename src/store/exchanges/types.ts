import { type EntityId, type Dictionary } from '@reduxjs/toolkit'

export interface Currency {
  code: string
  value: number
}

interface List {
  ids: EntityId[]
  entities: Dictionary<Currency>
}

export interface InitialState {
  table: {
    baseCurrency: string
    list: List
    meta: {
      loading: boolean
      loaded: boolean
      error: boolean
    }
  }
  convert: {
    baseCurrency: string
    list: List
    meta: {
      loading: boolean
      loaded: boolean
      error: boolean
    }
  }
}

export interface GetListExchanges {
  baseCurrency: string
}

export interface GetListExchangesRes {
  data: Record<string, Currency>
}
