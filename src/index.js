// @flow

/*

General idea:
- case-insensitive
- diacritics-insensitive
- works with Latin script, Cyrillic, rudimentary CJK support
- limited fuzzing: matches query letters in order, but they don't have to be consecutive
  (but no or very limited transposition or removals are allowed - they cause more confusion than help)
- no FTS-style stemming, soundex, levenstein, autocorrect - query can be lazy, but not sloppy
- sort by how well text matches the query

Think VS Code/Dash-like search, not Google-like search

## Sorting

Results are sorted in roughly this order:

1. [0]    Exact match (found === query)
2. [0.1]  Full match (like exact, but case&diacritics-insensitive)
3. [0.5]  "Starts with" match
4. [0.9]  Contains query (starting at word boundary) exactly
5. [1]    Contains query (starting at word boundary)
6. [1.5+] Contains query words (space separated) in any order
7. [2]    Contains query
8. [2+]   Contains letters -- the fewer chunks, the better

Note:
- Lower score is better (think "error level")
- Exact scoring values are not an API contract, can change between releases
- Secondary sort criteria (for equal fuzzy sort) is input order

*/

/**
 * Range of indices in a string, [index of first character, index of last character]
 */
export type Range = [number, number]

/**
 * List of character ranges in a string that should be highlighted
 */
export type HighlightRanges = Range[]

/**
 * List of fuzzy search matches (ranges of matching characters) for an item. This usually has one item, but can have more if `getText`
 * was used to return multiple strings for an item.
 */
export type FuzzyMatches = Array<?HighlightRanges>

/**
 * Result of fuzzy matching `queryText` against an item.
 *
 * `score` - lower = better match (think "error level")
 */
export type FuzzyResult<T> = $Exact<{ item: T, score: number, matches: FuzzyMatches }>

/**
 * Strategy for fuzzy search
 *
 * 'off'        - no fuzzy search, only matches if item contains/starts with query/contains query words
 * 'smart'      - (default) matches letters in order, but poor quality matches are ignored
 * 'aggressive' - matches letters in order with no restrictions (classic fuzzy search)
 */
export type FuzzySearchStrategy = 'off' | 'smart' | 'aggressive'

export type FuzzySearchOptions = $Exact<{
  key?: string,
  getText?: (any) => Array<?string>,
  strategy?: FuzzySearchStrategy,
}>

export type FuzzySearcher<T> = (string) => Array<FuzzyResult<T>>

/**
 * Creates a fuzzy search function that can be used to search `list` by passing `queryText` to it:
 *
 * ```js
 * const fuzzySearch = createFuzzySearch(list)
 * const results = fuzzySearch(queryText)
 * ```
 *
 * Only matching items will be returned, and they will be sorted by how well they match `queryText`.
 *
 * If `list` is an array of strings, it can be searched as-is. Otherwise pass to `options`:
 *
 * ```js
 * // search by `text` property
 * { key: 'text' }
 * // OR:
 * { getText: (item) => [item.text] }
 * // search by multiple properties:
 * { getText: (item) => [item.text, item.otherText] }
 * ```
 *
 * If you use React, use `useFuzzySearchList` hook for convenience.
 */
export default function createFuzzySearch<Element>(
  list: Element[],
  options?: FuzzySearchOptions = ({}: any),
): FuzzySearcher<Element> {
  return require('./impl').createFuzzySearchImpl(list, options)
}

/**
 * Runs a one-off fuzzy search matching on `text` against `queryText`.
 *
 * Use `createFuzzySearch` whenever you have a list of items to search.
 */
export function fuzzyMatch(text: string, queryText: string): ?FuzzyResult<string> {
  return require('./impl').fuzzyMatchImpl(text, queryText)
}

export { default as normalizeText } from './normalizeText'
