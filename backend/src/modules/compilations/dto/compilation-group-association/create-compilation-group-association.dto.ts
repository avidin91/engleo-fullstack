import { Compilations } from '../../entities/compilations.entity';
import { Groups } from '../../../groups/entities/groups.entity';

export class CreateCompilationGroupAssociationDto {
    compilation: Compilations;
    group: Groups;
}
