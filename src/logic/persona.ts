export type PersonaType = 'sunshine' | 'quiet' | 'dreamer' | 'gentle'

export const PERSONA_ORDER: PersonaType[] = ['sunshine', 'quiet', 'dreamer', 'gentle']

export interface PersonaScore {
  winner: PersonaType
  tally: Record<PersonaType, number>
}

/**
 * Category counting. Each answer adds one point to its category.
 * Ties are broken deterministically: the tied category chosen most recently
 * wins; if that is still ambiguous (it cannot be, as answers are distinct
 * events) the fixed PERSONA_ORDER decides.
 */
export function scorePersonality(answers: PersonaType[]): PersonaScore {
  const tally: Record<PersonaType, number> = { sunshine: 0, quiet: 0, dreamer: 0, gentle: 0 }
  for (const a of answers) tally[a] += 1

  const max = Math.max(...PERSONA_ORDER.map((t) => tally[t]))
  const tied = PERSONA_ORDER.filter((t) => tally[t] === max)

  if (tied.length === 1) return { winner: tied[0], tally }

  for (let i = answers.length - 1; i >= 0; i--) {
    if (tied.includes(answers[i])) return { winner: answers[i], tally }
  }
  return { winner: tied[0], tally }
}
