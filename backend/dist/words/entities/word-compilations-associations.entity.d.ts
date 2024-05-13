import { Words } from './words.entity';
import { Compilations } from './compilations.entity';
export declare class WordCompilationsAssociation {
    id: number;
    word: Words;
    compilation: Compilations;
}
