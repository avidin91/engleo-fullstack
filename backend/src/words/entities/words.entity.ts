import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Words {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  word: string;

  @Column({ type: 'varchar', length: 255 })
  translation: string;

  @Column({ type: 'text' })
  example: string;

  @Column({ type: 'text' })
  exampleTranslation: string;

  @Column({ type: 'text' })
  image: string;
}
