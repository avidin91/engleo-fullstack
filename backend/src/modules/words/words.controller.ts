import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/word/create-word.dto';
import { UpdateWordDto } from './dto/word/update-word.dto';
import { Roles } from '../../rbac/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../rbac/roles.guard';

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    createCompilation(@Body() createWordDto: CreateWordDto) {
        return this.wordsService.createWord(createWordDto);
    }

    @Get()
    async getAllCompilations() {
        return await this.wordsService.getAllWords();
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteCompilation(@Param('id') id: number) {
        return await this.wordsService.deleteWord(id);
    }

    @Put(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateGroup(
        @Param('id') id: number,
        @Body() updateWordDto: UpdateWordDto,
    ) {
        return await this.wordsService.updateWord(id, updateWordDto);
    }
}
