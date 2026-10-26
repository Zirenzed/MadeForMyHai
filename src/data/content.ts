import type { PersonaType } from '../logic/persona'
import type { MatchMode } from '../logic/answers'

export const SCENE_TITLES = [
  'A Little Gift for You',
  'Songs That Remind Me of You',
  'Flowers I Never Gave You',
  'The Little Secret Hunt',
  'Little Things About You',
  'Letters I Never Sent',
  'The Last Flower',
] as const

export const SCENE_COUNT = SCENE_TITLES.length

/* ------------------------------------------------------------------ */
/* Scene 2 — songs                                                     */
/* ------------------------------------------------------------------ */

export interface Song {
  id: string // Spotify track ID
  title: string
  artist: string
  side: string
  track: string
  note: string
}

export const SONGS: Song[] = [
  {
    id: '5hSAMX0YTjCOeGrZcN1za2',
    title: 'ยืด',
    artist: 'KS, FOMEO',
    side: 'Side A',
    track: 'Track 01',
    note: 'เพลงที่อยากให้เธอลองฟังดูสักครั้งนะ',
  },
  {
    id: '7ApNdlOBsjvmG4IiRZEpuP',
    title: 'คุณจะชอบผมไหม',
    artist: 'Serious bacon, gorn',
    side: 'Side A',
    track: 'Track 02',
    note: 'บางเพลงก็เหมือนพูดแทนเราได้เลยนะ',
  },
  {
    id: '5IZqeGVtJIdESgYhvixsMN',
    title: '1-100',
    artist: 'Tattoo Colour',
    side: 'Side B',
    track: 'Track 03',
    note: 'ไม่รู้ทำไมเหมือนกัน แต่ฟังเพลงนี้ทีไรก็นึกถึงเธอ',
  },
  {
    id: '0vhuUxZ2J94B1Fcv9jI7UL',
    title: 'Oasis',
    artist: 'atom chanakarn, D Gerrard',
    side: 'Side B',
    track: 'Track 04',
    note: 'เพลงสุดท้ายของม้วนนี้ แต่ไม่ใช่ความรู้สึกสุดท้ายนะ',
  },
]

/* ------------------------------------------------------------------ */
/* Scene 3 — flowers                                                   */
/* ------------------------------------------------------------------ */

export type FlowerId = 'sunflower' | 'rose' | 'daisy' | 'violet'

export interface FlowerInfo {
  id: FlowerId
  name: string
  thaiName: string
  label: string
  message: string
  aside: string
}

export const FLOWERS: FlowerInfo[] = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    thaiName: 'ดอกทานตะวัน',
    label: 'For Your Smile',
    message: 'ดอกนี้แทนรอยยิ้มของเธอ ที่ทำให้วันธรรมดาของเราดีขึ้นได้เฉยเลย',
    aside: 'pressed on a sunny day',
  },
  {
    id: 'rose',
    name: 'Pink Rose',
    thaiName: 'กุหลาบสีชมพู',
    label: 'For the Unsaid',
    message: 'มีบางความรู้สึกที่เรายังไม่ค่อยกล้าพูดตรง ๆ แต่ก็อยากให้เธอรับรู้ไว้',
    aside: 'kept very quietly',
  },
  {
    id: 'daisy',
    name: 'Daisy',
    thaiName: 'เดซี่',
    label: 'For the Little Things',
    message: 'เราเริ่มชอบเรื่องเล็ก ๆ เกี่ยวกับเธอ โดยที่ไม่รู้ตัวเหมือนกัน',
    aside: 'small but it counts',
  },
  {
    id: 'violet',
    name: 'Violet',
    thaiName: 'ไวโอเล็ต',
    label: 'Just Because',
    message: 'ไม่มีเหตุผลพิเศษหรอก แค่อยากให้เธอมีดอกไม้จากเรา',
    aside: 'no reason needed',
  },
]

/* ------------------------------------------------------------------ */
/* Scene 4 — secret hunt                                               */
/* ------------------------------------------------------------------ */

export interface Clue {
  id: string
  kind: 'text' | 'choice'
  title: string
  prompt: string
  placeholder?: string
  options?: { value: string; label: string }[]
  accepts: string[]
  match?: MatchMode
  hints: string[]
  reveal: string
  success: string
}

export const CLUES: Clue[] = [
  {
    id: 'clue-song',
    kind: 'text',
    title: 'Clue 01 · the tape',
    prompt: 'เพลงสุดท้ายของม้วนเทปนี้ชื่ออะไรนะ? ลองย้อนกลับไปดูหน้าเพลงได้เลย',
    placeholder: 'พิมพ์ชื่อเพลง',
    accepts: ['oasis', 'โอเอซิส', 'โอเอซีส'],
    hints: ['ชื่อเพลงเป็นภาษาอังกฤษ มีห้าตัวอักษร', 'มันคือแหล่งน้ำเล็ก ๆ กลางทะเลทราย'],
    reveal: 'Oasis',
    success: 'ถูกต้องเลย! แต่ยังมีโน้ตลับอีกสองใบนะ',
  },
  {
    id: 'clue-flower',
    kind: 'choice',
    title: 'Clue 02 · the flowers',
    prompt: 'ดอกไม้ที่มีป้ายว่า “For Your Smile” คือดอกอะไร?',
    options: [
      { value: 'sunflower', label: 'ทานตะวัน' },
      { value: 'rose', label: 'กุหลาบสีชมพู' },
      { value: 'daisy', label: 'เดซี่' },
      { value: 'violet', label: 'ไวโอเล็ต' },
    ],
    accepts: ['sunflower'],
    hints: ['เป็นดอกที่ชอบหันหาแสงอาทิตย์', 'ในชื่อของมันมีคำว่า “ตะวัน”'],
    reveal: 'ดอกทานตะวัน',
    success: 'ใช่แล้ว ดอกไม้ที่หันหาแสง และทำให้นึกถึงรอยยิ้มของใครบางคน',
  },
  {
    id: 'clue-someone',
    kind: 'text',
    title: 'Clue 03 · someone special',
    prompt: 'ม้วนเทปและดอกไม้ทั้งหมดนี้ ทำขึ้นมาเพื่อใครเป็นพิเศษ?',
    placeholder: 'พิมพ์สั้น ๆ ก็ได้',
    accepts: ['you', 'เธอ', 'คุณ'],
    match: 'includes',
    hints: ['ลองนึกถึงป้ายกระดาษบนหน้าปก: made just for …', 'ตอบสั้น ๆ ได้เลย เช่น “เธอ” หรือ “you”'],
    reveal: 'เธอ ♡',
    success: 'ใช่เลย เธอนั่นแหละ ♡ ทุกอย่างในนี้ทำขึ้นมาเพื่อเธอ',
  },
]

export const HUNT_WRONG_FEEDBACK = [
  'ยังไม่ใช่นะ ลองอีกครั้งได้เลย ไม่ต้องรีบ',
  'ใกล้แล้วมั้ง? ลองเปิดใบ้ดูก็ได้นะ',
  'ไม่เป็นไรเลย ลองอีกที หรือขอใบ้ก็ได้',
]

/* ------------------------------------------------------------------ */
/* Scene 5A — getting to know you                                      */
/* ------------------------------------------------------------------ */

export interface KnowOption {
  label: string
  feedback: string
}

export interface KnowQuestion {
  short: string
  question: string
  options: KnowOption[]
}

export const KNOW_QUESTIONS: KnowQuestion[] = [
  {
    short: 'วันหยุดในฝัน',
    question: 'วันหยุดแบบไหนที่เธออยากได้ที่สุด?',
    options: [
      { label: 'นอนตื่นสาย แล้วดูซีรีส์ยาว ๆ', feedback: 'ฟังดูเป็นวันที่ใจดีกับตัวเองมากเลย' },
      { label: 'ออกไปหาของอร่อยกับคาเฟ่เก๋ ๆ', feedback: 'แผนนี้ดีนะ ขอแอบอยากไปด้วยเลย' },
      { label: 'เดินเล่นเงียบ ๆ ที่สวนหรือริมทะเล', feedback: 'วันที่ได้หายใจลึก ๆ แบบนี้ดีจริง' },
      { label: 'ลงมือทำสิ่งที่ชอบสักอย่าง', feedback: 'ได้ทำสิ่งที่รักแล้วเวลาผ่านไปไวเลยเนอะ' },
    ],
  },
  {
    short: 'บรรยากาศที่ชอบ',
    question: 'บรรยากาศแบบไหนที่ทำให้เธอใจฟู?',
    options: [
      { label: 'ฝนตกปรอย ๆ ข้างหน้าต่าง', feedback: 'เสียงฝนเบา ๆ ทำให้ใจสงบลงได้จริง ๆ' },
      { label: 'แดดอุ่น ๆ ตอนบ่าย', feedback: 'แดดอ่อน ๆ แบบนั้นอุ่นสบายมากเลย' },
      { label: 'ไฟเหลืองนุ่ม ๆ ตอนกลางคืน', feedback: 'บรรยากาศแบบนี้เหมาะกับการคุยกันเบา ๆ' },
      { label: 'ลมเย็น ๆ ริมน้ำตอนเย็น', feedback: 'ฟังดูเหมือนฉากในหนังเลย' },
    ],
  },
  {
    short: 'ดอกไม้หรือเพลง',
    question: 'ถ้าเลือกได้แค่อย่างเดียว เธออยากได้อะไร?',
    options: [
      { label: 'ดอกไม้ช่อเล็ก ๆ', feedback: 'ช่อเล็ก ๆ แต่ตั้งใจ น่ารักที่สุดแล้ว' },
      { label: 'เพลงที่ใช่สักเพลง', feedback: 'เพลงที่ใช่เพลงเดียว บางทีก็อยู่กับเรานานเลย' },
      { label: 'ขอทั้งสองอย่างเลย', feedback: 'โลภนิดหน่อยแต่น่ารัก เห็นด้วยเลย' },
      { label: 'ขอเป็นอย่างอื่นนะ', feedback: 'ไม่เป็นไรเลย อยากรู้เหมือนกันว่าเป็นอะไร' },
    ],
  },
  {
    short: 'เครื่องดื่มปลอบใจ',
    question: 'เครื่องดื่มที่ช่วยปลอบใจเธอได้ดีที่สุดคือ?',
    options: [
      { label: 'ชาอุ่น ๆ', feedback: 'ถ้วยอุ่น ๆ ในมือ ก็อุ่นถึงใจเหมือนกัน' },
      { label: 'กาแฟหอม ๆ', feedback: 'กลิ่นกาแฟช่วยให้วันเริ่มต้นได้จริง' },
      { label: 'ชานมเย็น หวาน ๆ', feedback: 'ความหวานที่พอดี ช่วยได้เยอะเลย' },
      { label: 'โกโก้ร้อน', feedback: 'โกโก้ร้อนคือการกอดในรูปแบบแก้วเลยนะ' },
    ],
  },
  {
    short: 'เซอร์ไพรส์เล็ก ๆ',
    question: 'เซอร์ไพรส์เล็ก ๆ แบบไหนที่ทำให้เธอยิ้มได้?',
    options: [
      { label: 'ข้อความสั้น ๆ น่ารัก ๆ', feedback: 'คำสั้น ๆ ที่จริงใจ มีพลังกว่าที่คิดนะ' },
      { label: 'ขนมชิ้นโปรด', feedback: 'ขนมชิ้นเดียวก็ทำให้ทั้งวันดีขึ้นได้' },
      { label: 'ดอกไม้หนึ่งดอก', feedback: 'ดอกเดียวก็พอ ถ้าเลือกมาอย่างตั้งใจ' },
      { label: 'เพลงที่มีคนเลือกมาให้ฟัง', feedback: 'แบบนี้เหมือนม้วนเทปนี้เลยนะ' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Scene 5B — love personality                                         */
/* ------------------------------------------------------------------ */

export interface PersonaOption {
  label: string
  type: PersonaType
}

export interface PersonaQuestion {
  question: string
  options: PersonaOption[]
}

export const PERSONA_QUESTIONS: PersonaQuestion[] = [
  {
    question: 'เวลาได้พักผ่อน เธอมักจะ…',
    options: [
      { label: 'ชวนใครสักคนไปทำอะไรสนุก ๆ', type: 'sunshine' },
      { label: 'อยู่เงียบ ๆ กับเพลงหรือหนังสือ', type: 'quiet' },
      { label: 'นั่งจินตนาการเรื่องที่อยากทำในอนาคต', type: 'dreamer' },
      { label: 'ดูแลตัวเองและคนใกล้ตัวเบา ๆ', type: 'gentle' },
    ],
  },
  {
    question: 'ถ้ามีคนที่ชอบ เธอมักจะแสดงออกยังไง?',
    options: [
      { label: 'ยิ้มและชวนคุยบ่อย ๆ', type: 'sunshine' },
      { label: 'แอบใส่ใจเรื่องเล็ก ๆ ของเขา', type: 'quiet' },
      { label: 'เก็บไว้ในใจ แล้วจินตนาการเรื่องราวไปไกล', type: 'dreamer' },
      { label: 'ถามไถ่ ห่วงใย และคอยอยู่ข้าง ๆ', type: 'gentle' },
    ],
  },
  {
    question: 'ของขวัญแบบไหนที่ถูกใจเธอที่สุด?',
    options: [
      { label: 'อะไรที่ทำให้หัวเราะออกมาได้', type: 'sunshine' },
      { label: 'จดหมายเขียนด้วยลายมือ', type: 'quiet' },
      { label: 'ของที่ดูเหมือนหลุดมาจากเทพนิยาย', type: 'dreamer' },
      { label: 'ของเล็ก ๆ ที่คิดมาแล้วว่าเธอจะได้ใช้', type: 'gentle' },
    ],
  },
  {
    question: 'ช่วงเวลาไหนของวันที่เธอชอบที่สุด?',
    options: [
      { label: 'เช้าแดดใส ๆ', type: 'sunshine' },
      { label: 'ดึก ๆ ที่ทุกอย่างเงียบสงบ', type: 'quiet' },
      { label: 'ช่วงพระอาทิตย์ตกดิน', type: 'dreamer' },
      { label: 'บ่ายสบาย ๆ กับเครื่องดื่มอุ่น ๆ', type: 'gentle' },
    ],
  },
  {
    question: 'เพื่อน ๆ มักจะบอกว่าเธอเป็นคนที่…',
    options: [
      { label: 'ทำให้บรรยากาศสดใสขึ้น', type: 'sunshine' },
      { label: 'น่าค้นหา และมีเสน่ห์เงียบ ๆ', type: 'quiet' },
      { label: 'มีโลกส่วนตัวที่สวยงาม', type: 'dreamer' },
      { label: 'พึ่งพาได้และใจดีเสมอ', type: 'gentle' },
    ],
  },
]

export interface PersonaResult {
  title: string
  thaiTitle: string
  description: string
  message: string
}

export const PERSONA_RESULTS: Record<PersonaType, PersonaResult> = {
  sunshine: {
    title: 'The Sunshine Soul',
    thaiTitle: 'คนแสงแดด',
    description:
      'เธอทำให้บรรยากาศรอบตัวอบอุ่นขึ้นได้โดยไม่ต้องพยายาม รอยยิ้มและพลังงานดี ๆ ของเธอทำให้วันธรรมดากลายเป็นวันที่น่าจดจำ',
    message: 'ขอให้แสงของเธอไม่เคยหมดนะ แล้วถ้าวันไหนเหนื่อย ก็พักใต้ร่มสักหน่อยก็ได้ ♡',
  },
  quiet: {
    title: 'The Quiet Romantic',
    thaiTitle: 'นักโรแมนติกเงียบ ๆ',
    description:
      'เธอสังเกตเห็นรายละเอียดเล็ก ๆ และใส่ใจอย่างเงียบ ๆ ความรู้สึกของเธอไม่ได้ดังนัก แต่ลึกซึ้งและจริงใจ',
    message: 'คนที่ค่อย ๆ เปิดใจแบบนี้ น่าค้นหามากเลยนะ',
  },
  dreamer: {
    title: 'The Little Dreamer',
    thaiTitle: 'นักฝันตัวน้อย',
    description:
      'ในหัวของเธอมีโลกใบเล็ก ๆ ที่สวยงามอยู่เสมอ เธอมองเห็นความเป็นไปได้ในเรื่องธรรมดา และทำให้คนรอบข้างอยากฝันตามไปด้วย',
    message: 'ฝันต่อไปนะ เราอยากรู้ว่าในโลกใบนั้นมีอะไรบ้าง',
  },
  gentle: {
    title: 'The Gentle Heart',
    thaiTitle: 'หัวใจอ่อนโยน',
    description:
      'เธอใส่ใจและอ่อนโยนกับคนรอบข้างเสมอ การอยู่ใกล้เธอทำให้รู้สึกปลอดภัยและสบายใจ',
    message: 'อย่าลืมใจดีกับตัวเองด้วยนะ เหมือนที่ใจดีกับคนอื่น',
  },
}

/* ------------------------------------------------------------------ */
/* Scene 6 — letters                                                   */
/* ------------------------------------------------------------------ */

export interface Letter {
  id: string
  label: string
  flower: FlowerId
  paragraphs: string[]
  sign: string
}

export const LETTERS: Letter[] = [
  {
    id: 'thanks',
    label: 'A Little Thank You',
    flower: 'daisy',
    paragraphs: [
      'ขอบคุณนะ ที่ทำให้บทสนทนาธรรมดา ๆ ของเรากลายเป็นช่วงเวลาที่เราชอบ บางวันก็เป็นแค่ข้อความสั้น ๆ หรือเรื่องเล็ก ๆ ที่เธอเล่าให้ฟัง แต่มันทำให้วันของเราอ่อนโยนขึ้นกว่าเดิมเยอะเลย',
      'ขอบคุณที่ตั้งใจฟัง ขอบคุณที่หัวเราะไปด้วยกัน และขอบคุณที่เป็นเธอแบบนี้ ไม่ต้องทำอะไรเป็นพิเศษเลย แค่นี้ก็ดีมากแล้ว',
    ],
    sign: 'จากเรา',
  },
  {
    id: 'unsaid',
    label: 'Things I Haven’t Said',
    flower: 'rose',
    paragraphs: [
      'เราเพิ่งรู้ตัวว่า เราสังเกตเรื่องเล็ก ๆ ของเธอเยอะกว่าที่คิดไว้ แล้วก็จำมันได้โดยไม่ได้ตั้งใจเลย',
      'เราเองก็ไม่แน่ใจว่าความรู้สึกดี ๆ นี้เริ่มตั้งแต่ตอนไหน มันค่อย ๆ มาทีละนิด จนวันหนึ่งเรารู้ตัวว่าเราดีใจทุกครั้งที่ได้คุยกับเธอ',
      'จดหมายฉบับนี้ไม่ได้ต้องการคำตอบอะไรนะ เราแค่อยากเขียนมันไว้ให้เธอ ในวันที่เรายังไม่รู้จะพูดออกไปยังไงดี',
    ],
    sign: 'จากเรา',
  },
  {
    id: 'smile',
    label: 'For a Day You Need a Smile',
    flower: 'sunflower',
    paragraphs: [
      'ไม่ว่าวันนี้ของเธอจะเป็นยังไง เราอยากให้เธอรู้ว่าเธอสมควรได้รับความใจดีและวันดี ๆ เสมอ ไม่ต้องเก่งตลอดเวลา และไม่ต้องรีบไปไหนก็ได้',
      'ถ้าวันไหนอยากได้รอยยิ้มสักนิด ลองเปิดจดหมายฉบับนี้ แล้วนึกถึงเรื่องเล็ก ๆ ที่ทำให้เธอยิ้มได้ เช่น เพลงที่ชอบ ขนมอร่อย ๆ หรือดอกไม้สักดอก',
      'ขอส่งกำลังใจเบา ๆ มาให้เธอนะ ♡',
    ],
    sign: 'จากเรา',
  },
]

/* ------------------------------------------------------------------ */
/* Scene 7 — confession                                                */
/* ------------------------------------------------------------------ */

export const CONFESSION_PARAGRAPHS = [
  'จริง ๆ แล้ว ช่วงที่เราได้คุยกัน ได้รู้จักเธอมากขึ้นทีละนิด เรารู้สึกดีมากเลยนะ',
  'เราไม่รู้เหมือนกันว่าความรู้สึกนี้เริ่มตั้งแต่เมื่อไหร่ รู้ตัวอีกที เราก็เริ่มอยากเล่าเรื่องเล็ก ๆ ในแต่ละวันให้เธอฟัง และอยากรู้ว่าในวันธรรมดาของเธอเป็นยังไงบ้าง',
  'เราเลยอยากบอกตรง ๆ ว่า… เรารู้สึกชอบเธอนะ ♡',
  'ไม่ต้องรีบตอบเราก็ได้ และเธอไม่จำเป็นต้องรู้สึกเหมือนเราก็ได้ เราแค่อยากให้เธอรู้ว่าการได้รู้จักเธอเป็นเรื่องดี ๆ สำหรับเรา',
]

export const CONFESSION_CHOICES = {
  yes: {
    label: 'เราก็รู้สึกดีเหมือนกัน ♡',
    reply: 'งั้นเราค่อย ๆ ทำความรู้จักกันต่อไปนะ ♡',
  },
  later: {
    label: 'ขอเวลาอีกนิดนะ',
    reply: 'ไม่เป็นไรเลย ค่อย ๆ รู้สึก ค่อย ๆ ทำความรู้จักกันก็ได้ ขอบคุณที่อ่านมาถึงตรงนี้นะ',
  },
} as const

export type ConfessionChoice = keyof typeof CONFESSION_CHOICES

/* ------------------------------------------------------------------ */
/* Scene 1 — little surprises on the cover                             */
/* ------------------------------------------------------------------ */

export const COVER_SPOTS = {
  left: {
    label: 'โน้ตกระดาษแผ่นซ้าย',
    messages: [
      'เราเลือกเพลงในม้วนนี้ทีละเพลง แล้วนึกถึงเธอทุกครั้งที่ฟังนะ',
      'เพลงเดิม ๆ แต่พอได้ฟังพร้อมกับเรื่องของเธอ ก็รู้สึกต่างไปเหมือนกัน',
      'ไม่ต้องรีบฟังให้ครบก็ได้ ค่อย ๆ ฟังตอนที่พร้อมนะ',
    ],
  },
  right: {
    label: 'โน้ตกระดาษแผ่นขวา',
    messages: [
      'ช่วงเวลาเล็ก ๆ แต่ความรู้สึกใหญ่กว่าที่คิดไว้เยอะเลย',
      'วันธรรมดาที่มีเธออยู่ในบทสนทนา มันก็พิเศษขึ้นมานิดนึง',
      'เรื่องเล็ก ๆ ของเธอ เราจำได้หมดเลยนะ',
    ],
  },
  stamp: {
    label: 'แสตมป์ดวงเล็ก',
    messages: [
      'แสตมป์ดวงนี้ส่งความรู้สึกไปถึงเธอฟรี ไม่ต้องรีบตอบกลับก็ได้',
      'ส่งถึง: เธอ · จาก: คนที่แอบดีใจทุกครั้งที่ได้คุยด้วย',
    ],
  },
} as const

export type CoverSpot = keyof typeof COVER_SPOTS

export const COVER_EGG =
  'ความลับข้อแรก: ม้วนเทปนี้ไม่ได้ทำเสร็จในวันเดียวนะ ค่อย ๆ เลือกเพลง ค่อย ๆ เก็บดอกไม้ ขอบคุณที่แตะมาจนถึงตรงนี้ ♡'
