import { FunctionComponent } from 'react'
import type { HighlightRanges } from '../../index'

type Style = { [key: string]: any } | null | undefined
type ClassName = string | null | undefined

type Props = {
  text: string
  ranges: HighlightRanges | null
  style?: Style
  className?: ClassName
}

declare const FullSelection: HighlightRanges

/**
 * Highlights `text` at `ranges`.
 *
 * To override default styling, pass `style` and `className` or use `createHighlightComponent` to
 * create a custom component with default styles overriden.
 *
 * To higlight all of text, pass `ranges={Highlight.FullSelection}`.
 */
declare const Highlight: FunctionComponent<Props> & {
  FullSelection: typeof FullSelection
}
export default Highlight

/**
 * Creates a variant of `<Highlight />` component with default styles set to `customStyle` and
 * `customClassName`.
 */
export function createHighlightComponent(
  customStyle: Style,
  customClassName: ClassName,
): FunctionComponent<Props> & {
  FullSelection: typeof FullSelection
}
