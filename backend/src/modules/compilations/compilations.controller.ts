import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CompilationsService } from './compilations.service';
import { CreateCompilationDto } from './dto/create-compilation.dto';
import { Roles } from '../../rbac/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../rbac/roles.guard';
import { UpdateCompilationDto } from './dto/update-compilation.dto';
import { ICompilationGroupIds } from './types';
import { GetCompilationsDto } from './dto/get-compilations.dto';

@Controller('compilations')
export class CompilationsController {
    constructor(private readonly compilationsService: CompilationsService) {}

    @Get()
    getAllCompilations() {
        return this.compilationsService.getAllCompilations();
    }

    @Post('new')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    createCompilation(@Body() createCompilationDto: CreateCompilationDto) {
        return this.compilationsService.createCompilation(createCompilationDto);
    }

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getCompilations(@Body() getCompilationsDto: GetCompilationsDto) {
        return this.compilationsService.getCompilations(
            getCompilationsDto.pagination,
        );
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteCompilation(@Param('id') id: number) {
        return await this.compilationsService.deleteCompilation(id);
    }

    @Put(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateGroup(
        @Param('id') id: number,
        @Body() updateCompilationDto: UpdateCompilationDto,
    ) {
        return await this.compilationsService.updateCompilation(
            id,
            updateCompilationDto,
        );
    }

    @Get('groups')
    async getAllCompilationsGroupsAssociations() {
        return await this.compilationsService.getAllCompilationsGroupsAssociations();
    }

    @Post('groups')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createCompilationGroupAssociation(
        @Body() compilationGroupIds: ICompilationGroupIds,
    ) {
        return await this.compilationsService.createCompilationGroupAssociation(
            compilationGroupIds,
        );
    }

    @Delete('groups/:id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteCompilationGroupAssociation(@Param('id') id: number) {
        return await this.compilationsService.deleteCompilationGroupAssociation(
            id,
        );
    }
}
