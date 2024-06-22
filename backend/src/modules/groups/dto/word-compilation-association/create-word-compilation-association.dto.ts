import { Words } from '../../../words/entities/words.entity';
import { Compilations } from '../../../compilations/entities/compilations.entity';

export class CreateWordCompilationAssociationDto {
    word: Words;
    compilation: Compilations;
}
