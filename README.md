<p align="center">
  <img src="https://github.com/Nozbe/microfuzz/raw/main/assets/nozbe_demo.gif" alt="microfuzz in action in Nozbe" width="624" />
</p>

<h1 align="center">
  microfuzz
</h1>

<h4 align="center">
  A tiny, simple, fast JS fuzzy search library
</h4>

<p align="center">
  ✨ Easily add power user-friendly search, autocomplete, jump to, command palette to your app.
</p>

<p align="center">
  <a href="https://github.com/Nozbe/microfuzz/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"/>
  </a>

  <a href="https://www.npmjs.com/package/@nozbe/microfuzz">
    <img src="https://img.shields.io/npm/v/@nozbe/microfuzz.svg" alt="npm"/>
  </a>
</p>

|   | microfuzz |
| - | ------------ |
| 🤓 | **Fuzzy search**. Power users love it |
| 🗜️ | **Tiny**. 2KB gzipped |
| ✅ | **Simple**. Only a few options, reasonable defaults |
| ⚡️ | **Fast**. Filter thousands of items in milliseconds |
| 🧰 | **Framework-agnostic**. Plain JS, no dependencies |
| ⚛️ | **React/React Native** helpers (optional) included |
| ⚠️ | **Static typing** with [Flow](https://flow.org) or [TypeScript](https://typescriptlang.org) |

## microfuzz pitch

General idea of how `microfuzz` works:

- Case-insensitive and diacritics-insensitive search
- Works with Latin script, Cyrillic, rudimentary CJK support
- Limited fuzzing: matches query letters in order, but they don't have to be consecutive
  (but transposition and missing characters are not allowed)
- Some very poor fuzzy matches are rejected by default (see [_Fuzzy search strategies_](#fuzzy-search-strategies))
- Additionally, matches query _words_ in any order
- NOT full-text search. Stemming, soundex, levenstein, autocorrect are _not_ included
- Sorts by how well text matches the query with simple heuristics (for equal fuzzy score, input
  order is preserved, so you can pre-sort array if you want).
- Returns ranges of matching characters for pretty highlighting
- In-memory search, no indexing

`microfuzz` is not a one-size-fits-all solution (see [_Alternatives to consider_](#alternatives-to-consider)).

## Demo

[**➡️ See demo**](https://nozbe.github.io/microfuzz/)

## Using microfuzz (plain JS)

```js
import createFuzzySearch from '@nozbe/microfuzz'

const list = [/* an array of strings to fuzzy search */]
const fuzzySearch = createFuzzySearch(list)

// Run this whenever search term changes
// Only matching items will be returned, sorted by how well they match `queryText`
const results = fuzzySearch(queryText)
```

This is split into two steps for performance (`createFuzzySearch` pre-processes `list`, and you can cache/memoize function returned by it).

If `list` is an array of objects:

```js
const fuzzySearch = createFuzzySearch(list, {
  // search by `name` property
  key: 'name',
  // search by `description.text` property
  getText: (item) => [item.description.text]
  // search by multiple properties:
  getText: (item) => [item.name, item.description.text]
})
```

### Using microfuzz in React

If you use React or React Native, you can use these optional helpers for convenience:

```js
import { useFuzzySearchList, Highlight } from '@nozbe/microfuzz/react'

// `useFuzzySearchList` simply wraps `createFuzzySearch` with memoization built in
// NOTE: For best performance, `getText` and `mapResultItem` should be memoized by user
const filteredList = useFuzzySearchList({
  list,
  // If `queryText` is blank, `list` is returned in whole
  queryText,
  // optional `getText` or `key`, same as with `createFuzzySearch`
  getText: (item) => [item.name],
  // arbitrary mapping function, takes `FuzzyResult<T>` as input
  mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({ item, highlightRanges })
})

// Render `filteredList`'s labels with matching characters highlighted
filteredList.map(({ item, highlightRanges }) => (
  <Item key={item.key}>
    <Label><Highlight text={item.name} ranges={highlightRanges} /></Label>
  </Item>
))
```

### Fuzzy search strategies

You can optionally pass `{ strategy: }` parameter to `createFuzzySearch` / `useFuzzySearchList`:

- `'off'`        - no fuzzy search, only matches if item contains query (or contains query words in any order)
- `'smart'`      - (default) matches letters in order, but poor quality matches are ignored
- `'aggressive'` - matches letters in order with no restrictions (classic fuzzy search)

## Alternatives to consider

I wrote `microfuzz` simply because I didn't quite like how other fuzzy search libraries I found worked, **for my use case**. Your mileage may vary.

It's not the tiniest, the simplest, or the fastest implementation you can find. But it's tiny, simple, and fast enough, while providing fuzzy search heuristics and sorting that I found to work reasonably well in [Nozbe](https://nozbe.com), a project management app, where it's used to filter down or autocomplete lists of short labels — names of projects, sections, tasks, user names, etc.

By "fast" I mean that on my computer, with a list of ~4500 labels, the first search (one-letter search query) takes ~7ms, while subsequent searches take less than 1.5ms — all in-memory, without indexing. More than fast enough to search on every keystroke without any lag.

If you have much larger lists to fuzzy-search, you may find the performance unsatisfactory — consider implementations with simpler heuristics or indexing. For very long strings (notes, comments), fuzzy-searching may not be the right strategy — consider Full-Text Search (with indexing) instead.

Feel free to contribute improvements to sorting heuristics or alternative search strategies (provided that the "fast, simple, tiny" criteria don't suffer too much).

Alternatives:

- [Fuse.js](https://github.com/krisk/Fuse) - popular implementation with **many more options**, including extended search and indexing. However, while its scoring (sorting) is much more sophisticated in theory, I found it unsatisfactory in practice.
- [fuzzysort](https://github.com/farzher/fuzzysort) - faster and really good for fuzzy searching lists of file names/file paths, but I don't like its scoring for natural language labels. I borrowed the test data from fuzzysort so you can compare both demos side by side.
- [MiniSearch](https://www.npmjs.com/package/minisearch)
- [fuzzy](https://github.com/mattyork/fuzzy)
- [fuzzy-search](https://github.com/wouterrutgers/fuzzy-search) - an even simpler implementation than microfuzz
- [fuzzysearch](https://github.com/bevacqua/fuzzysearch) - tiniest implementation of the list

## Author and license

**microfuzz** was created by [@Nozbe](https://github.com/Nozbe).

**microfuzz's** main author and maintainer is [Radek Pietruszewski](https://github.com/radex) ([website](https://radex.io) ⋅ [twitter](https://twitter.com/radexp) ⋅ [engineering posters](https://beamvalley.com))

[See all contributors](https://github.com/Nozbe/microfuzz/graphs/contributors).

microfuzz is available under the MIT license. See the [LICENSE file](https://github.com/Nozbe/microfuzz/LICENSE) for more info.
