import { Groups } from './groups.entity';
import { Compilations } from './compilations.entity';
export declare class CompilationsGroupsAssociation {
    id: number;
    compilation: Compilations;
    word: Groups;
}
