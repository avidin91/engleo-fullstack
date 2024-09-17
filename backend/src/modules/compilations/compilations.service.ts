import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compilations } from './entities/compilations.entity';
import { CompilationsGroupsAssociation } from './entities/compilations-groups-associations.entity';
import { In, Repository } from 'typeorm';
import { CreateCompilationDto } from './dto/create-compilation.dto';
import { UpdateCompilationDto } from './dto/update-compilation.dto';
import { ICompilationGroupIds } from './types';
import { Groups } from '../groups/entities/groups.entity';

@Injectable()
export class CompilationsService {
    constructor(
        @InjectRepository(Compilations)
        private readonly compilationsRepository: Repository<Compilations>,

        @InjectRepository(CompilationsGroupsAssociation)
        private readonly compilationsGroupsRepository: Repository<CompilationsGroupsAssociation>,

        @InjectRepository(Groups)
        private readonly groupsRepository: Repository<Groups>,
    ) {}

    async createCompilation(createCompilationDto: CreateCompilationDto) {
        const compilation = await this.compilationsRepository.findOne({
            where: { title: createCompilationDto.title },
        });

        if (compilation) {
            throw new BadRequestException('Такая подборка уже есть!');
        }

        try {
            await this.compilationsRepository.save({
                title: createCompilationDto.title,
                titleInEnglish: createCompilationDto.titleInEnglish,
                description: createCompilationDto.description,
                image: createCompilationDto.image,
                slug: createCompilationDto.slug,
            });

            return { message: 'ok' };
        } catch (error) {
            console.error('Error occurred during user creation:', error);
            throw new InternalServerErrorException(
                'Failed to create compilation due to internal server error',
            );
        }
    }

    async getCompilations({
        pageSize = 10,
        current = 1,
    }: {
        pageSize: number;
        current: number;
    }) {
        const skip = pageSize * (current - 1);
        const compilations = await this.compilationsRepository.find({
            order: {
                id: 'DESC',
            },
            skip, // пропуск указанного количества записей
            take: pageSize, // взять указанное количество записей
        });

        const total = await this.compilationsRepository.count();

        return {
            current,
            compilations,
            total,
        };
    }

    async getAllCompilations() {
        return await this.compilationsRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async getCompilationsDemo() {
        const groups = await this.groupsRepository.find({
            order: {
                id: 'DESC',
            },
            take: 4,
        });

        const groupIds = groups.map((group) => group.id);
        return await this.compilationsGroupsRepository.find({
            relations: ['compilation', 'group'],
            where: {
                group: In(groupIds),
            },
        });
    }

    async deleteCompilation(id: number) {
        const compilation = await this.compilationsRepository.findOne({
            where: { id },
        });

        if (!compilation) {
            throw new NotFoundException(`Подборка с id ${id} не найдена`);
        }
        return await this.compilationsRepository.remove(compilation);
    }

    async updateCompilation(
        id: number,
        updateCompilationDto: UpdateCompilationDto,
    ) {
        const result = await this.compilationsRepository.update(
            { id },
            updateCompilationDto,
        );

        if (result.affected === 0) {
            throw new NotFoundException(`Подборка с id ${id} не найдена`);
        }

        return result;
    }

    async getAllCompilationsGroupsAssociations() {
        const data = await this.compilationsGroupsRepository.find({
            relations: ['compilation', 'group'],
        });
        return data.map((association) => {
            return {
                relationsId: association.id,
                groupId: association.group.id,
                groupTitle: association.group.title,
                compilationId: association.compilation.id,
            };
        });
    }

    async createCompilationGroupAssociation(
        compilationGroupIds: ICompilationGroupIds,
    ) {
        const { compilationId, groupId } = compilationGroupIds;

        const compilation = await this.compilationsRepository.findOne({
            where: { id: compilationId },
        });
        if (!compilation) {
            throw new NotFoundException(
                `Compilation with id ${compilationId} not found`,
            );
        }

        const group = await this.groupsRepository.findOne({
            where: { id: groupId },
        });
        if (!group) {
            throw new NotFoundException(`Group with id ${groupId} not found`);
        }

        const association = new CompilationsGroupsAssociation();
        association.compilation = compilation;
        association.group = group;

        await this.compilationsGroupsRepository.save(association);
        return { message: 'Association created successfully' };
    }

    async deleteCompilationGroupAssociation(id: number) {
        const result = await this.compilationsGroupsRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Association with id ${id} not found`);
        }

        return { message: 'Association deleted successfully' };
    }
}
