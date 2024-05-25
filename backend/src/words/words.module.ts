import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compilations } from './entities/compilations.entity';
import { CompilationsGroupsAssociation } from './entities/compilations-groups-associations.entity';
import { Words } from './entities/words.entity';
import { WordCompilationsAssociation } from './entities/word-compilations-associations.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Compilations,
            CompilationsGroupsAssociation,
            Words,
            WordCompilationsAssociation,
        ]),
    ],
    controllers: [WordsController],
    providers: [WordsService],
})
export class WordsModule {}
