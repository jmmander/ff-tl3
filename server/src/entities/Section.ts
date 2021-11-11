import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CardEntity } from './Card'
import { BoardEntity } from './Board'

@Entity({ name: 'sections' })
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  title: string

  @Column({ name: 'board_id', default: 1 })
  board_id: number

  @OneToMany(() => CardEntity, (card) => card.section)
  @JoinColumn({ referencedColumnName: 'section_id' })
  cards: CardEntity[]

  @ManyToOne(() => BoardEntity, (board) => board.sections)
  board: BoardEntity
}
