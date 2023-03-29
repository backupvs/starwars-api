import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @ApiOkResponse({
        schema: {
            type: 'object',
            properties: {
                key: { type: 'string' },
                imageUrl: { type: 'string' }
            },
        }
    })
    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.imagesService.remove(Number(id));
    }
}
