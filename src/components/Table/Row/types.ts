import { type EntityId } from '@reduxjs/toolkit'

export interface RowProps {
  code: EntityId
  onClick?: VoidFunction
}
