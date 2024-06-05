import { Words } from '../../entities/words.entity';
import { Compilations } from '../../entities/compilations.entity';

export class CreateWordCompilationAssociationDto {
  word: Words;
  compilation: Compilations;
}
