/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React from 'react'
import { CellProps, isTimeControl, RankedTester, rankWith } from '@jsonforms/core'
import { withJsonFormsCellProps } from '@jsonforms/react'
import type { VanillaRendererProps } from '../index'
import { withVanillaCellProps } from '../util/index'

/**
 * AJV 'time' format expects HH:mm:ss while <input type='time'> only returns HH:mm.
 * Therefore we append ':00' when the seconds are missing.
 */
const appendSecondsIfNecessary = (value: unknown) => {
  if (typeof value === 'string') {
    const splitValue = value.split(':')
    if (splitValue.length === 2) {
      splitValue.push('00')
    }
    return splitValue.join(':')
  }
  return value
}

export const TimeCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props

  return (
    <input
      type="time"
      value={data || ''}
      onChange={ev => handleChange(path, appendSecondsIfNecessary(ev.target.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    />
  )
}

/**
 * Default tester for date controls.
 * @type {RankedTester}
 */
export const timeCellTester: RankedTester = rankWith(2, isTimeControl)

export default withJsonFormsCellProps(withVanillaCellProps(TimeCell))
