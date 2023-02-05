export interface SelectProps {
  value?: string | number
  list?: Array<string | number>
  onChange: (val: any) => void
}
