import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CardEntity } from './Card'
import { BoardEntity } from './Board'

@Entity({ name: 'sections' })
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({})
  title: string

  @Column({ name: 'board_id' })
  board_id: number

  @OneToMany(() => CardEntity, (card) => card.section)
  @JoinColumn({ referencedColumnName: 'section_id' })
  cards: CardEntity[]

  @ManyToOne(() => BoardEntity, (board) => board.sections)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity
}
