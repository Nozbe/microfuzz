// @flow

const diacriticsRegex = /[\u0300-\u036f]/g
const regexŁ = /ł/g
const regexÑ = /ñ/g

/**
 * Normalizes text so that it's suitable to comparisons, sorting, search, etc. by:
 * - turning into lowercase
 * - removing diacritics
 * - removing extra whitespace
 */
export default function normalizeText(string: string): string {
  return (
    string
      .toLowerCase()
      // get rid of diacritics
      // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      // yeah, it's not perfect, but 97% is good enough and it doesn't seem worth it to add in a whole
      // library for this
      .normalize('NFD')
      .replace(diacriticsRegex, '')
      // fix letters that unicode considers separate, not letters with diacritics
      .replace(regexŁ, 'l')
      .replace(regexÑ, 'n')
      .trim()
  )
}
