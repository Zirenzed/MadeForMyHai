/**
 * Answer checking for the secret hunt.
 * Forgiving about capitalisation, spaces and punctuation, and (for longer
 * Latin words only) tolerant of a single typo.
 */

const STRIP = /[\s​.,!?'"“”‘’`´\-_()[\]{}:;~♡♥*/\\|]+/g

export function normalizeAnswer(input: string): string {
  return input.normalize('NFC').toLowerCase().replace(STRIP, '')
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let diagonal = prev[0]
    prev[0] = i
    for (let j = 1; j <= b.length; j++) {
      const temp = prev[j]
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
      diagonal = temp
    }
  }
  return prev[b.length]
}

const LATIN_WORD = /^[a-z]+$/

export type MatchMode = 'exact' | 'includes'

export function isCorrect(input: string, accepts: string[], mode: MatchMode = 'exact'): boolean {
  const value = normalizeAnswer(input)
  if (!value) return false
  const targets = accepts.map(normalizeAnswer).filter(Boolean)

  if (mode === 'includes') {
    return targets.some((t) => value.includes(t))
  }

  return targets.some((t) => {
    if (value === t) return true
    // One-typo tolerance, only for Latin words of 5+ letters (e.g. "oasiss").
    return t.length >= 5 && LATIN_WORD.test(t) && LATIN_WORD.test(value) && levenshtein(value, t) <= 1
  })
}
