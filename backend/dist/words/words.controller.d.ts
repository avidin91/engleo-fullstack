import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
export declare class WordsController {
    private readonly wordsService;
    constructor(wordsService: WordsService);
    create(createWordDto: CreateWordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWordDto: UpdateWordDto): string;
    remove(id: string): string;
}
