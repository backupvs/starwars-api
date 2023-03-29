import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../users/entities/role.enum';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
    constructor(
        private readonly starshipsService: StarshipsService,
    ) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.starshipsService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.starshipsService.findOne(Number(id));
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createStarshipDto: CreateStarshipDto) {
        return this.starshipsService.create(createStarshipDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id', IdValidationPipe) id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
        return this.starshipsService.update(Number(id), updateStarshipDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.starshipsService.remove(Number(id));
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ['image-file']: {
                    type: 'string',
                    format: 'binary',
                    description: 'The image file to upload'
                },
            },
            required: ['image-file']
        },
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FileInterceptor('image-file'))
    @Post(':id/add-image')
    @Roles(Role.ADMIN)
    addImage(
        @Param('id', IdValidationPipe) id: string,
        @UploadedFile(FileValidationPipe) imageFile: Express.Multer.File
    ) {
        return this.starshipsService.addImage(Number(id), imageFile);
    }
}
