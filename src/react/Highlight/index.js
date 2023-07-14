// @flow
import React, { memo, Fragment, type Node } from 'react'
import { type HighlightRanges } from '../../index'
import { TextElement } from './platform'

type Style = ?{ [string]: mixed }
type ClassName = ?string

type Props = $Exact<{
  text: string,
  ranges: ?HighlightRanges,
  style?: Style,
  className?: ClassName,
}>

const FullSelection: HighlightRanges = [[0, Number.MAX_VALUE]]

const defaultStyle: Style = { backgroundColor: 'rgba(245,220,0,.25)' }

/**
 * Highlights `text` at `ranges`.
 *
 * To override default styling, pass `style` and `className` or use `createHighlightComponent` to
 * create a custom component with default styles overriden.
 *
 * To higlight all of text, pass `ranges={Highlight.FullSelection}`.
 */
const Highlight: React$StatelessFunctionalComponent<Props> = (props) => {
  const { text, ranges, style, className } = props

  if (!ranges) {
    return text
  }

  let lastHighlightedIndex = 0
  const nodes: Array<Node | string> = []

  ranges.forEach(([start, end]) => {
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
      <TextElement style={style ?? defaultStyle} className={className} key={`${start}-${end}`}>
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

type HighlightExport = React$ComponentType<Props> &
  $Exact<{
    FullSelection: typeof FullSelection,
  }>

const ExportedHighlight: HighlightExport = Object.assign((memo(Highlight): any), {
  FullSelection,
})

export default ExportedHighlight

/**
 * Creates a variant of `<Highlight />` component with default styles set to `customStyle` and
 * `customClassName`.
 */
export function createHighlightComponent(
  customStyle: Style,
  customClassName: ClassName,
): HighlightExport {
  const HighlightComponent = ({ style, className, ...props }: Props) =>
    Highlight({ ...props, style: style ?? customStyle, className: className ?? customClassName })
  HighlightComponent.FullSelection = FullSelection
  // $FlowFixMe[incompatible-exact]
  return HighlightComponent
}
