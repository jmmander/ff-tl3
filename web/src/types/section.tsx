import CardI from './card'

export default interface SectionI {
  id: number
  title: string
  board_id: string
  cards: CardI[]
}
