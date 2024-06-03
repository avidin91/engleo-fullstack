import { Injectable } from '@nestjs/common';
import { FileResponseElementDto } from './dto/file-response-element.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
import slugify from 'slugify';

@Injectable()
export class FilesService {
    async saveFiles(
        files: MFile[],
        entity: 'word-compilation' | 'word',
    ): Promise<FileResponseElementDto[]> {
        const uploadFolder = `${path}/uploads/${entity}`;
        await ensureDir(uploadFolder);
        const res: FileResponseElementDto[] = [];

        for (const file of files) {
            await writeFile(
                `${uploadFolder}/${file.originalname}`,
                file.buffer,
            );
            res.push({
                url: `${entity}/${file.originalname}`,
                name: file.originalname,
            });
        }

        return res;
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }

    formatName(file: MFile) {
        const fileName = file.originalname.slice(
            0,
            file.originalname.lastIndexOf('.'),
        );
        const fileExtension = file.originalname.slice(
            file.originalname.lastIndexOf('.') + 1,
        );

        const newName = slugify(fileName, {
            remove: /[\s!#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,
        });
        return `${newName}.${fileExtension}`;
    }
}
