import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompilationsGroupsAssociation } from '../compilations/entities/compilations-groups-associations.entity';
import { Groups } from './entities/groups.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompilationsGroupsAssociation, Groups]),
    ],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}
