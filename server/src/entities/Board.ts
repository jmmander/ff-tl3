import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { SectionEntity } from './Section'

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  title: string

  @OneToMany(() => SectionEntity, (section) => section.board)
  @JoinColumn({ referencedColumnName: 'board_id' })
  sections: SectionEntity[]
}
