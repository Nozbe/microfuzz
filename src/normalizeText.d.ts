/**
 * Normalizes text so that it's suitable to comparisons, sorting, search, etc. by:
 * - turning into lowercase
 * - removing diacritics
 * - removing extra whitespace
 */
export default function normalizeText(string: string): string
