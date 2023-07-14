import React from 'react'
import { type FuzzyResult, type FuzzySearchStrategy } from '../index'

export type UseFuzzySearchListOptions<T, U> = {
  list: T[]
  key?: string
  getText?: (item: T) => Array<string | null>
  queryText: string
  mapResultItem: (result: FuzzyResult<T>) => U
  strategy?: FuzzySearchStrategy
}

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
}: UseFuzzySearchListOptions<T, U>): U[]
