import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Words } from './words.entity';
import { Compilations } from '../../compilations/entities/compilations.entity';

@Entity()
@Index(['word', 'compilation'], { unique: true })
export class WordCompilationsAssociation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Words, (word) => word.id)
    @JoinColumn({ name: 'word_id' })
    word: Words;

    @ManyToOne(() => Compilations, (compilation) => compilation.id)
    @JoinColumn({ name: 'compilation_id' })
    compilation: Compilations;
}
