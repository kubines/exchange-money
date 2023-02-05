import React, { type RefObject, useCallback, useState, type ReactElement } from 'react'
import clsx from 'clsx'
import { TbChevronDown, TbChevronUp } from 'react-icons/tb'

import { useClickOutside } from 'hooks/useClickOutside'

import styles from './select.module.css'
import { type SelectProps } from './types'

export function Select ({ value, list, onChange }: SelectProps): ReactElement {
  const [show, setShow] = useState(false)

  const ref: RefObject<HTMLDivElement> = useClickOutside(() => {
    setShow(false)
  })

  const onClickValue = useCallback((val: string | number) => {
    onChange(val)
    setShow(false)
  }, [onChange])

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={clsx(styles.select, {
          [styles.select_active]: show
        })}
        onClick={() => { setShow((state) => !state) }}
        aria-hidden="true"
      >
        {value}
        {show ? <TbChevronUp /> : <TbChevronDown />}
      </div>
      {show && (
        <ul
          className={styles.options}
        >
          {list?.map((item) => (
            <li
              key={item}
              className={clsx([styles.option, {
                [styles.option_active]: item === value
              }])}
              onClick={() => { onClickValue(item) }}
              aria-hidden="true"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}
