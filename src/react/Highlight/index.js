// @flow
import React, { memo, Fragment, type Node } from 'react'
import { type FuzzyHighlightIndices } from '../../index'
import { TextElement } from './platform'

type Style = ?{ [string]: mixed }
type ClassName = ?string

type Props = $Exact<{
  text: string,
  indices: ?FuzzyHighlightIndices,
  style?: Style,
  className?: ClassName,
}>

const FullSelection: FuzzyHighlightIndices = [[0, Number.MAX_VALUE]]

let defaultStyle: Style = { backgroundColor: 'rgba(245,220,0,.25)' }
let defaultClassName: ClassName

export function setDefaultStyles(style: Style, className: ClassName): void {
  defaultStyle = style
  defaultClassName = className
}

const Highlight: NTComponent<Props> = (props) => {
  const { text, indices, style, className } = props

  if (!indices) {
    return text
  }

  let lastHighlightedIndex = 0
  const nodes: Array<Node | string> = []

  indices.forEach(([start, end]) => {
    // Broken range, ignore
    if (start < lastHighlightedIndex || end < start) {
      // eslint-disable-next-line no-console
      console.warn(`Broken range in <Highlight>: ${start}-${end}, last: ${lastHighlightedIndex}`)
      return
    }

    if (start > lastHighlightedIndex) {
      nodes.push(
        <Fragment key={`t${lastHighlightedIndex}-${start}`}>
          {text.slice(lastHighlightedIndex, start)}
        </Fragment>,
      )
    }
    nodes.push(
      <TextElement
        style={style ?? defaultStyle}
        className={className ?? defaultClassName}
        key={`${start}-${end}`}
      >
        {text.slice(start, end + 1)}
      </TextElement>,
    )
    lastHighlightedIndex = end + 1
  })

  if (text.length > lastHighlightedIndex) {
    nodes.push(<Fragment key="last">{text.slice(lastHighlightedIndex, text.length)}</Fragment>)
  }

  return nodes
}

type HighlighterExport = React$ComponentType<Props> &
  $Exact<{
    FullSelection: typeof FullSelection,
  }>

const Export: HighlighterExport = Object.assign((memo(Highlight): any), {
  FullSelection,
})

export default Export
