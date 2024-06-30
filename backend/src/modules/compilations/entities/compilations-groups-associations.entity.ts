import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from '../../groups/entities/groups.entity';
import { Compilations } from './compilations.entity';

@Entity()
@Index(['compilation', 'group'], { unique: true })
export class CompilationsGroupsAssociation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Compilations, (compilation) => compilation.id)
    @JoinColumn({ name: 'compilation_id' })
    compilation: Compilations;

    @ManyToOne(() => Groups, (group) => group.id)
    @JoinColumn({ name: 'group_id' })
    group: Groups;
}
