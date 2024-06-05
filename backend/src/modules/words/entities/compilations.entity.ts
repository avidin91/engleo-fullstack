import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compilations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  title: string;

  @Column({ type: 'text', unique: true, nullable: false })
  titleInEnglish: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @Column({ type: 'text', unique: true, nullable: false })
  slug: string;
}
