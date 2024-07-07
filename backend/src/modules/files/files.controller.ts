import {
    Controller,
    HttpCode,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../rbac/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../rbac/roles.guard';
import { FileResponseElementDto } from './dto/file-response-element.dto';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload/:entity')
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('entity') entity: 'word-compilation' | 'word',
    ): Promise<FileResponseElementDto[]> {
        file.originalname = this.filesService.formatName(file);
        // const saveArray: MFile[] = [file]; - file - оригинальный файл без изменений
        const saveArray: MFile[] = [];

        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer);
            saveArray.push(
                new MFile({
                    originalname: `${file.originalname.split('.')[0]}.webp`,
                    buffer,
                }),
            );
        }

        return this.filesService.saveFiles(saveArray, entity);
    }
}
