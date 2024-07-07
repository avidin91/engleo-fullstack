import { Module } from '@nestjs/common';
import { CompilationsService } from './compilations.service';
import { CompilationsController } from './compilations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compilations } from './entities/compilations.entity';
import { CompilationsGroupsAssociation } from './entities/compilations-groups-associations.entity';
import { WordCompilationsAssociation } from '../words/entities/word-compilations-associations.entity';
import { Groups } from '../groups/entities/groups.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Groups,
            Compilations,
            CompilationsGroupsAssociation,
            WordCompilationsAssociation,
        ]),
    ],
    controllers: [CompilationsController],
    providers: [CompilationsService],
})
export class CompilationsModule {}
