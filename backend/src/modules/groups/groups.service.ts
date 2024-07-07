import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from './entities/groups.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Groups)
        private readonly groupsRepository: Repository<Groups>,
    ) {}

    async createGroup(createGroupDto: CreateGroupDto) {
        const group = await this.groupsRepository.findOne({
            where: { title: createGroupDto.title },
        });

        if (group) {
            throw new BadRequestException('Такая группа уже есть!');
        }

        try {
            await this.groupsRepository.save({
                title: createGroupDto.title,
                slug: createGroupDto.slug,
            });

            return { message: 'ok' };
        } catch (error) {
            console.error('Error occurred during user creation:', error);
            throw new InternalServerErrorException(
                'Failed to create user due to internal server error',
            );
        }
    }

    async getGroups({
        pageSize = 10,
        current = 1,
    }: {
        pageSize: number;
        current: number;
    }) {
        const skip = pageSize * (current - 1);
        const groups = await this.groupsRepository.find({
            order: {
                id: 'DESC',
            },
            skip, // пропуск указанного количества записей
            take: pageSize, // взять указанное количество записей
        });

        const total = await this.groupsRepository.count();

        return {
            current,
            groups,
            total,
        };
    }

    async getAllGroups() {
        return await this.groupsRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async deleteGroup(id: number) {
        const group = await this.groupsRepository.findOne({ where: { id } });

        if (!group) {
            throw new NotFoundException(`Группа с id ${id} не найдена`);
        }
        return await this.groupsRepository.remove(group);
    }

    async updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
        const result = await this.groupsRepository.update(
            { id },
            updateGroupDto,
        );

        if (result.affected === 0) {
            throw new NotFoundException(`Группа с id ${id} не найдена`);
        }

        return result;
    }
}
