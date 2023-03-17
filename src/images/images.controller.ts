import { Controller, Delete, Param } from '@nestjs/common';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.imagesService.remove(Number(id));
    }
}
