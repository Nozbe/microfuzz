// @flow

// TODO: What's the current best practice for allowing `@nozbe/microfuzz/react` imports without overcomplicating
// build setup for such a tiny library that just works with everything? I tried declaring `exports` on package.json
// but it seems broken on my setup?

// $FlowFixMe[cannot-resolve-module]
const { Highlight, createHighlightComponent, useFuzzySearchList } = require('./dist/react')

module.exports = { Highlight, createHighlightComponent, useFuzzySearchList }

// $FlowFixMe[cannot-resolve-module]
/*:: export type { UseFuzzySearchListOptions } from './dist/react' */
