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

export type FuzzyRangeTuple = [/* first index */ number, /* last index */ number]
export type FuzzyHighlightIndices = FuzzyRangeTuple[]
export type FuzzyMatches = Array<?FuzzyHighlightIndices>

export type FuzzyResult<T> = $Exact<{
  item: T,
  score: number /* lower = better match (think "error level") */,
  matches: FuzzyMatches,
}>

export type FuzzySearchStrategy =
  | 'off' // no fuzzy search, only contains query/contains words criteria are used
  | 'smart' // (default) matches letters in order, but poor quality matches are ignored
  | 'aggressive' // matches letters in order with no restrictions

export type FuzzySearchOptions = $Exact<{
  key?: string,
  getText?: (any) => Array<?string>,
  strategy?: FuzzySearchStrategy,
}>

export type FuzzySearcher<T> = (string) => Array<FuzzyResult<T>>

export default function fuzzySearch<Element>(
  collection: Element[],
  options?: FuzzySearchOptions = ({}: any),
): FuzzySearcher<Element> {
  return require('./impl').fuzzySearchImpl(collection, options)
}

export function matchFuzzily(text: string, query: string): ?FuzzyResult<string> {
  return require('./impl').matchFuzzilyImpl(text, query)
}

export { default as normalizeText } from './normalizeText'
