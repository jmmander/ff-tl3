import SectionI from './section'

export default interface BoardI {
  id: number
  title: string
  sections: SectionI[]
}
