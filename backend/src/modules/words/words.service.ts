import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Words } from './entities/words.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordCompilationsAssociation } from './entities/word-compilations-associations.entity';
import { Compilations } from '../compilations/entities/compilations.entity';

@Injectable()
export class WordsService {
    constructor(
        @InjectRepository(Words)
        private readonly wordsRepository: Repository<Words>,

        @InjectRepository(WordCompilationsAssociation)
        private readonly wordCompilationsRepository: Repository<WordCompilationsAssociation>,

        @InjectRepository(Compilations)
        private readonly compilationsRepository: Repository<Compilations>,
    ) {}

    async getWords({
        pageSize = 10,
        current = 1,
    }: {
        pageSize: number;
        current: number;
    }) {
        const skip = pageSize * (current - 1);
        const words = await this.wordsRepository.find({
            order: {
                id: 'DESC',
            },
            skip, // пропуск указанного количества записей
            take: pageSize, // взять указанное количество записей
        });

        const total = await this.wordsRepository.count();

        return {
            current,
            words,
            total,
        };
    }

    async createWord(createWordDto: CreateWordDto) {
        const word = await this.wordsRepository.findOne({
            where: { word: createWordDto.word },
        });

        if (word) {
            throw new BadRequestException('Такое слово уже есть!');
        }

        try {
            await this.wordsRepository.save({
                word: createWordDto.word,
                translation: createWordDto.translation,
                example: createWordDto.example,
                exampleTranslation: createWordDto.exampleTranslation,
                image: createWordDto.image,
            });

            return { message: 'ok' };
        } catch (error) {
            console.error('Error occurred during user creation:', error);
            throw new InternalServerErrorException(
                'Failed to create user due to internal server error',
            );
        }
    }

    async deleteWord(id: number) {
        const word = await this.wordsRepository.findOne({
            where: { id },
        });

        if (!word) {
            throw new NotFoundException(`Слово с id ${id} не найдено`);
        }
        return await this.wordsRepository.remove(word);
    }

    async updateWord(id: number, updateWordDto: UpdateWordDto) {
        const result = await this.wordsRepository.update({ id }, updateWordDto);

        if (result.affected === 0) {
            throw new NotFoundException(`Слово с id ${id} не найдено`);
        }

        return result;
    }

    async getAllWordsCompilationsAssociations() {
        const data = await this.wordCompilationsRepository.find({
            relations: ['compilation', 'word'],
        });

        return data.map((association) => {
            return {
                relationsId: association.id,
                compilationId: association.compilation.id,
                compilationTitle: association.compilation.title,
                wordId: association.word.id,
            };
        });
    }

    async createWordCompilationAssociation(
        wordCompilationIds: IWordCompilationIds,
    ) {
        const { compilationId, wordId } = wordCompilationIds;

        const compilation = await this.compilationsRepository.findOne({
            where: { id: compilationId },
        });
        if (!compilation) {
            throw new NotFoundException(
                `Compilation with id ${compilationId} not found`,
            );
        }

        const word = await this.wordsRepository.findOne({
            where: { id: wordId },
        });
        if (!word) {
            throw new NotFoundException(`Word with id ${wordId} not found`);
        }

        const association = new WordCompilationsAssociation();
        association.compilation = compilation;
        association.word = word;

        await this.wordCompilationsRepository.save(association);
        return { message: 'Association created successfully' };
    }

    async deleteWordCompilationAssociation(id: number) {
        const result = await this.wordCompilationsRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Association with id ${id} not found`);
        }

        return { message: 'Association deleted successfully' };
    }
}
