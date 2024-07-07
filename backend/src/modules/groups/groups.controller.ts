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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Roles } from '../../rbac/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../rbac/roles.guard';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GetGroupsDto } from './dto/get-groups.dto';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @Post('new')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createGroup(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupsService.createGroup(createGroupDto);
    }

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getGroups(@Body() getGroupssDto: GetGroupsDto) {
        return this.groupsService.getGroups(getGroupssDto.pagination);
    }

    @Get()
    async getAllGroups() {
        return await this.groupsService.getAllGroups();
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteGroup(@Param('id') id: number) {
        return await this.groupsService.deleteGroup(id);
    }

    @Put(':id')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateGroup(
        @Param('id') id: number,
        @Body() updateGroupDto: UpdateGroupDto,
    ) {
        return await this.groupsService.updateGroup(id, updateGroupDto);
    }
}
