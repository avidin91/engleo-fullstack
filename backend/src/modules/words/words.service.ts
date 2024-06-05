import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Words } from './entities/words.entity';
import { CreateWordDto } from './dto/word/create-word.dto';
import { UpdateWordDto } from './dto/word/update-word.dto';

@Injectable()
export class WordsService {
    constructor(
        @InjectRepository(Words)
        private readonly wordsRepository: Repository<Words>,
    ) {}

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

    async getAllWords() {
        return await this.wordsRepository.find({
            order: {
                id: 'DESC',
            },
        });
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
}
