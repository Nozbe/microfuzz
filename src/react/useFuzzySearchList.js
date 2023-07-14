// @flow

import React from 'react'
import createFuzzySearch, { type FuzzyResult, type FuzzySearchStrategy } from '../index'

export type UseFuzzySearchListOptions<T, U> = $Exact<{
  list: T[],
  key?: string,
  getText?: (T) => Array<?string>,
  queryText: string,
  mapResultItem: (FuzzyResult<T>) => U,
  strategy?: FuzzySearchStrategy,
}>

/**
 * Hook for fuzzy searching `list` against `queryText` and mapping the results with `mapResultItem`.
 *
 * If `queryText` is blank, `list` is returned in whole.
 *
 * See `createFuzzySearch` for more details. This hook simply wraps it (with memoization) in a React hook.
 *
 * For best performance, `getText` and `mapResultItem` functions should be memoized by the user.
 */
export default function useFuzzySearchList<T, U>({
  list,
  key,
  getText,
  queryText,
  mapResultItem,
  strategy,
}: UseFuzzySearchListOptions<T, U>): U[] {
  const performSearch = React.useMemo(
    () => createFuzzySearch(list, { key, getText, strategy }),
    [list, key, getText, strategy],
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
