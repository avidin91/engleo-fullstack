import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/word/create-word.dto';
import { UpdateWordDto } from './dto/word/update-word.dto';

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    // @Post('compilation')
    // createCompilation(@Body() createCompilationDto: CreateCompilationDto) {
    //     return this.wordsService.createCompilation(createCompilationDto);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    //   return this.wordsService.update(+id, updateWordDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.wordsService.remove(+id);
    // }
}
