import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const id = parseInt(value, 10);

        if (isNaN(id) || id < 0 || id > Number.MAX_SAFE_INTEGER) {
            throw new BadRequestException(`Bad id parameter`)
        }

        return id;
    }
}
