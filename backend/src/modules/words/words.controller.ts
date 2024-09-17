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
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Roles } from '../../rbac/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../rbac/roles.guard';
import { IWordCompilationIds } from './types';
import { GetWordsDto } from './dto/get-words.dto';

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getWords(@Body() getWordsDto: GetWordsDto) {
        return this.wordsService.getWords(getWordsDto.pagination);
    }

    @Post('new')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    createWord(@Body() createWordDto: CreateWordDto) {
        return this.wordsService.createWord(createWordDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteWord(@Param('id') id: number) {
        return await this.wordsService.deleteWord(id);
    }

    @Put(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateWord(
        @Param('id') id: number,
        @Body() updateWordDto: UpdateWordDto,
    ) {
        return await this.wordsService.updateWord(id, updateWordDto);
    }

    @Get('compilations')
    async getAllWordsCompilationsAssociations() {
        return await this.wordsService.getAllWordsCompilationsAssociations();
    }

    @Get('compilations/:slug')
    async getWordsCompilationAssociationBySlug(@Param('slug') slug: string) {
        return await this.wordsService.getWordsCompilationAssociationBySlug(
            slug,
        );
    }

    @Post('compilations')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createWordCompilationAssociation(
        @Body() wordCompilationIds: IWordCompilationIds,
    ) {
        return await this.wordsService.createWordCompilationAssociation(
            wordCompilationIds,
        );
    }

    @Delete('compilations/:id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteWordCompilationAssociation(@Param('id') id: number) {
        return await this.wordsService.deleteWordCompilationAssociation(id);
    }
}
