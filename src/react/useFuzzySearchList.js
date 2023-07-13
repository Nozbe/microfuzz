// @flow

import React from 'react'
import fuzzySearch, { type FuzzyResult, type FuzzySearchStrategy } from '../index'

export type UseFuzzySearchListOptions<T, U> = $Exact<{
  list: T[],
  getText: (T) => Array<?string>,
  queryText: string,
  mapResultItem: (FuzzyResult<T>) => U,
  strategy?: FuzzySearchStrategy,
}>

export default function useFuzzySearchList<T, U>({
  list,
  getText,
  queryText,
  mapResultItem,
  strategy,
}: UseFuzzySearchListOptions<T, U>): U[] {
  const performSearch = React.useMemo(
    () => fuzzySearch(list, { getText, strategy }),
    [list, getText, strategy],
  )

  const searchResults = React.useMemo(() => {
    return queryText
      ? performSearch(queryText).map(mapResultItem)
      : list.map((item) =>
          mapResultItem({
            item,
            score: Number.POSITIVE_INFINITY,
            matches: [],
          }),
        )
  }, [list, mapResultItem, performSearch, queryText])

  return searchResults
}
