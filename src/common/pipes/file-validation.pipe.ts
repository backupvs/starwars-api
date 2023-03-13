import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class FileValidationPipe implements PipeTransform {
    transform(file: any, metadata: ArgumentMetadata) {

        let errorMessages: string[] = [];
        const maxSize = 1_000_000; // 1 MB
        const allowedType = 'image/jpeg';

        if (file.size > maxSize) {
            errorMessages.push('Image size more than 1 MB');
        }

        if (file.mimetype !== allowedType) {
            errorMessages.push('Image has unsupported format')
        }

        if (errorMessages.length > 0) {
            throw new BadRequestException(errorMessages);
        }

        return file;
    }
    
}