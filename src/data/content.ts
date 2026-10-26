import type { PersonaType } from '../logic/persona'
import type { MatchMode } from '../logic/answers'

export const SCENE_TITLES = [
  'A Little Gift for You',
  'Songs That Remind Me of You',
  'Flowers I Want To Give You',
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
    note: 'เพลงแรกที่เบบี๋ส่งให้เค้า 😳',
  },
  {
    id: '7ApNdlOBsjvmG4IiRZEpuP',
    title: 'คุณจะชอบผมไหม',
    artist: 'Serious bacon, gorn',
    side: 'Side A',
    track: 'Track 02',
    note: 'แล้วคุณล่ะ ชอบผมได้ไหม 😳',
  },
  {
    id: '5IZqeGVtJIdESgYhvixsMN',
    title: '1-100',
    artist: 'Tattoo Colour',
    side: 'Side B',
    track: 'Track 03',
    note: 'ช่วยบอกผมทีว่ารักแค่ไหนจาก 1 ไปถึง 100 😳',
  },
  {
    id: '0vhuUxZ2J94B1Fcv9jI7UL',
    title: 'Oasis',
    artist: 'atom chanakarn, D Gerrard',
    side: 'Side B',
    track: 'Track 04',
    note: 'เธอคือ คนที่ฉันรอได้มาเจอ 😳',
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
    message: 'ดอกไม้โปรดของเบบี๋ และของเค้า 😳',
    aside: 'pressed on a sunny day',
  },
  {
    id: 'rose',
    name: 'Pink Rose',
    thaiName: 'กุหลาบสีชมพู',
    label: 'For the Unsaid',
    message: 'จริงๆไม่รู้ว่าทำไมต้องเป็นดอกนี้ แต่เบบี๋น่าจะชอบดอกไม้สีน่ารักๆ',
    aside: 'kept very quietly',
  },
  {
    id: 'daisy',
    name: 'Daisy',
    thaiName: 'เดซี่',
    label: 'For the Little Things',
    message: 'ผมเริ่มชอบเรื่องเล็ก ๆ เกี่ยวกับฮาย โดยที่ไม่รู้ตัวเหมือนกัน',
    aside: 'small but it counts',
  },
  {
    id: 'violet',
    name: 'Violet',
    thaiName: 'ไวโอเล็ต',
    label: 'Just Because',
    message: 'ไม่มีเหตุผลพิเศษหรอก แค่อยากให้ดอกไม้เบบี๋เฉยๆ',
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
    success: 'ใช่แล้ว ดอกไม้ที่หันหาแสง และทำให้โลกสดใสเหมือนเบบี๋',
  },
  {
    id: 'clue-someone',
    kind: 'text',
    title: 'Clue 03 · someone special',
    prompt: 'ม้วนเทปและดอกไม้ทั้งหมดนี้ ทำขึ้นมาเพื่อใครเป็นพิเศษ?',
    placeholder: 'พิมพ์สั้น ๆ ก็ได้',
    accepts: ['Hai', 'ฮาย', 'มานี'],
    match: 'includes',
    hints: ['ลองนึกถึงสาวผมแดงในเกมคนนั้น', 'ตอบสั้น ๆ ได้เลย เช่น “ชื่อของคุณ”'],
    reveal: 'เบบี๋ ♡',
    success: 'ใช่เลย เบบี๋นั่นแหละ ♡ ทุกอย่างในนี้ทำขึ้นมาเพื่อฮายคนเดียวนะครับ',
  },
]

export const HUNT_WRONG_FEEDBACK = [
  'ยังไม่ใช่นะครับ ลองอีกครั้งได้เลย ไม่ต้องรีบ',
  'ใกล้แล้วมั้ง? ลองเปิดคำใบ้ดูก็ได้นะครับ',
  'ไม่เป็นไรเลย ลองอีกทีนะครับ หรือขอคำใบ้ก็ได้',
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
    question: 'วันหยุดแบบไหนที่อ้วงอยากได้ที่สุด?',
    options: [
      { label: 'นอนตื่นสาย แล้วไม่ทำอะไรเลย', feedback: 'ฟังดูเป็นวันที่ดีนะครับว่าไหม' },
      { label: 'ออกไปหาของอร่อย ๆ', feedback: 'ไปด้วยคนได้ไหมนะครับ' },
      { label: 'นั่งเล่นเกมเงียบๆ กับคอร์นเน่', feedback: 'วันที่ได้พักผ่อนจริงๆสินะครับ' },
      { label: 'ออกไปข้างนอก ไปหาอะไรกิน', feedback: 'อ้วงจะไปข้างนอกหรอครับ ไปด้วยคนสิ' },
    ],
  },
  {
    short: 'บรรยากาศที่ชอบ',
    question: 'บรรยากาศแบบไหนที่ทำให้เธอใจฟู?',
    options: [
      { label: 'ฝนตกปรอย ๆ ข้างหน้าต่าง', feedback: 'เสียงฝนเบาๆ ทำให้นึกถึงผมบ้างไหมนะ' },
      { label: 'แดดอุ่น ๆ ตอนเช้า', feedback: 'แดดอ่อนๆ ในกรณีที่เบบี๋ตื่นเช้า' },
      { label: 'ไฟเหลืองนุ่ม ๆ ตอนกลางคืน', feedback: 'บรรยากาศดีๆแบบนี้ โทรคุยกันไหมครับ' },
      { label: 'ลมเย็น ๆ ริมน้ำตอนเย็น', feedback: 'เบบี๋หลับชัวร์แบบนี้' },
    ],
  },
  {
    short: 'ดอกไม้หรือเพลง',
    question: 'ถ้าเลือกได้แค่อย่างเดียว เธออยากได้อะไร?',
    options: [
      { label: 'ดอกไม้ช่อเล็ก ๆ', feedback: 'ช่อเล็กๆ แต่ตั้งใจให้ น่ารักพอไหมครับ' },
      { label: 'เพลงที่ใช่สักเพลง', feedback: 'เพลงที่ใช่เพลงเดียว บางทีก็ฟังอยู่นานเลย' },
      { label: 'ขอทั้งสองอย่างเลย', feedback: 'โลภนิดหน่อยแต่น่ารักดีครับ' },
      { label: 'ขอเป็นอย่างอื่นนะ', feedback: 'ไม่เป็นไรครับ อยากรู้เหมือนกันว่าเป็นอะไร' },
    ],
  },
  {
    short: 'เครื่องดื่มปลอบใจ',
    question: 'เครื่องดื่มที่ช่วยปลอบใจเธอได้ดีที่สุดคือ?',
    options: [
      { label: 'ชาอุ่น ๆ', feedback: 'ชาอุ่นๆหรือจะสู้มือผม' },
      { label: 'กาแฟหอม ๆ', feedback: 'เบบี๋ไม่ชอบกาแฟ แต่ผมชอบเบบี๋นะ' },
      { label: 'ชาองุ่นครีมชีส', feedback: 'ของโปรดเบบี๋ที่ผมคอยซื้อให้' },
      { label: 'โกโก้', feedback: 'ของโปรดของอ้วงที่ผมอยากคอยซื้อให้' },
    ],
  },
  {
    short: 'เซอร์ไพรส์เล็ก ๆ',
    question: 'เซอร์ไพรส์เล็ก ๆ แบบไหนที่ทำให้เธอยิ้มได้?',
    options: [
      { label: 'เติมเกมให้สุ่มกาชา', feedback: 'ฮั่นแน่ รู้เลยครับว่าชอบเล่นเกม' },
      { label: 'ขนมชิ้นโปรด', feedback: 'เติมน้ำตาลซักหน่อยนะครับอ้วง' },
      { label: 'ดอกไม้หนึ่งดอก', feedback: 'จริงๆสวนหลังบ้านว่างไหมครับ' },
      { label: 'เพลงที่มีคนเลือกมาให้ฟัง', feedback: 'แบบนี้เหมือนม้วนเทปนี้เลยนะครับ' },
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
      { label: 'เก็บไว้ในใจ แล้วทำเป็นไม่สนใจ', type: 'dreamer' },
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
      'ขอบคุณนะครับ ที่ทำให้บทสนทนาธรรมดาๆ ของเรากลายเป็นช่วงเวลาที่ดีที่สุด บางวันก็เป็นแค่ข้อความสั้นๆ หรือเรื่องเล็กๆ ที่อ้วงเล่าให้ฟัง แต่มันทำให้วันของผมดีขึ้นกว่าเดิมเยอะเลย',
      'ขอบคุณที่ตั้งใจฟัง ขอบคุณที่หัวเราะไปด้วยกัน ผมดีใจที่ได้เจอเบบี๋นะครับ เราไม่ต้องทำอะไรเป็นพิเศษเลย แค่นี้ก็ดีมากแล้ว',
    ],
    sign: 'จากคีย์',
  },
  {
    id: 'unsaid',
    label: 'Things I Haven’t Said',
    flower: 'rose',
    paragraphs: [
      'ผมเพิ่งรู้ตัวว่า ผมสังเกตเรื่องเล็กๆ ของเบบี๋เยอะกว่าที่คิดไว้ แล้วก็จำมันได้โดยไม่ได้ตั้งใจเลย',
      'ผมเองก็ไม่แน่ใจว่าความรู้สึกดีๆ นี้เริ่มตั้งแต่ตอนไหน แต่มันค่อยๆ มาทีละนิด จนวันหนึ่งก็รู้ตัวแล้วว่าดีใจทุกครั้งที่ได้คุยกับเบบี๋ครับ',
      'จดหมายฉบับนี้ไม่ได้ต้องการคำตอบอะไรนะ ผมแค่อยากเขียนขึ้นมาเพื่อให้เบบี๋รู้แค่นั้นเอง',
    ],
    sign: 'จากคีย์ของฮาย',
  },
  {
    id: 'smile',
    label: 'For a Day You Need a Smile',
    flower: 'sunflower',
    paragraphs: [
      'ไม่ว่าวันนี้ของเบบี๋จะเป็นยังไง ผมอยากให้รู้ไว้ว่าผมจะอยู่ข้างๆเบบี๋เสมอ เบบี๋ไม่ต้องเก่งตลอดเวลาก็ได้ แค่นี้เบบี๋ของผมก็เก่งที่สุดแล้วครับ ผมสุดแสนจะภูมิใจในตัวเบบี๋เลย',
      'แค่ชื่อเบบี๋เด้งขึ้นมาในโทรศัพท์ ก็ทำให้ผมเผลอยิ้มโดยไม่รู้ตัวแล้ว หวังว่าเบบี๋จะรู้สึกแบบนั้นเหมือนกันนะครับ',
      'แค่ได้คุยกัน วันนี้ก็สดใสขึ้นเยอะมากๆแล้ว ♡',
    ],
    sign: 'จากคีย์ของฮายคนเดียว',
  },
]

/* ------------------------------------------------------------------ */
/* Scene 7 — confession                                                */
/* ------------------------------------------------------------------ */

export const CONFESSION_PARAGRAPHS = [
  'ไม่รู้เหมือนกันครับว่าทำไมถึงเป็นเบบี๋ทุกครั้ง คนที่ตื่นมาก็อยากทักหา เจออะไรมาก็อยากเล่าให้ฟัง',
  'ถ้าย้อนกลับไปในวันที่เรายังไม่รู้จักกัน ผมก็ไม่รู้หรอกว่าตอนนั้นผมกำลังตามหาอะไร',
  'แต่วันนี้ผมดีใจนะครับที่เราได้เจอกัน ได้รู้จักเบบี๋ ได้เรียนรู้นิสัยเบบี๋ ได้มีโอกาสสร้างความทรงจำดีๆร่วมกันกับเบบี๋',
  'ผมชอบฮายนะครับ ♡',
]

export const CONFESSION_CHOICES = {
  yes: {
    label: 'ชอบเหมือนกัน ♡',
    reply: 'อยู่ด้วยกันไปนานๆนะครับฮาย ♡',
  },
  later: {
    label: 'ขอเวลาอีกนิดนะ',
    reply: 'ไม่เป็นไรครับ ผมรอเก่ง',
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
      'ผมเลือกเพลงในม้วนนี้ทีละเพลง เพลงที่ผมซ่อนฮายเอาไว้',
      'เพลงที่ฟังไปพร้อมกับฮาย ให้ความรู้สึกที่ใหม่ดีครับ',
      'ไม่ต้องรีบฟังให้ครบก็ได้ครับ ผมรอได้เสมอ',
    ],
  },
  right: {
    label: 'โน้ตกระดาษแผ่นขวา',
    messages: [
      'ช่วงเวลาเล็กๆ แต่ความรู้สึกใหญ่กว่าที่คิดไว้เยอะเลยนะครับ',
      'วันธรรมดาที่มีเบบี๋อยู่ในบทสนทนา มันก็พิเศษขึ้นมานิดนึง',
      'เรื่องเล็กๆของเบบี๋ ผมจะจำมันให้หมดเลยครับ',
    ],
  },
  stamp: {
    label: 'แสตมป์ดวงเล็ก',
    messages: [
      'แสตมป์ดวงนี้ส่งความรู้สึกไปถึงเบบี๋ฟรีๆ ไม่ต้องรีบตอบกลับก็ได้ครับ',
      'ส่งถึง: ฮาย · จาก: คนที่คิดถึงฮายมาตลอด',
    ],
  },
} as const

export type CoverSpot = keyof typeof COVER_SPOTS

export const COVER_EGG =
  'ความลับข้อแรก: ม้วนเทปนี้ทำขึ้นมาเพื่อฮายของผมคนเดียว ♡'
