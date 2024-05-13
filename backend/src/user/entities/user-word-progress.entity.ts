import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Words } from '../../words/entities/words.entity';

@Entity()
@Unique(['user', 'word'])
export class UserWordProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Words, (word) => word.id)
  @JoinColumn({ name: 'word_id' })
  word: Words;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endTime: Date;

  @Column({ default: 0 })
  status: number;
}
