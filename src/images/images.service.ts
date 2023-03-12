import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommandInput,
    PutObjectCommand,
    DeleteObjectCommandInput,
    DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    private readonly logger = new Logger();
    private readonly bucket: string;
    private readonly region: string;
    private readonly s3: S3Client;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>
    ) {
        this.bucket = configService.get('S3_BUCKET');
        this.region = configService.get('S3_REGION');
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: configService.get('S3_ACCESS_KEY'),
                secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY')
            }
        })
    }

    async create(imageFile: Express.Multer.File, key: string): Promise<Image> {
        const imageUrl = await this.uploadToS3(imageFile, key);
        const image = this.imageRepository.create({ imageUrl, key })

        return this.imageRepository.save(image);
    }

    async remove(id: number) {
        const image = await this.imageRepository.findOne({ where: { id } });

        if (!image) {
            throw new NotFoundException(`Image #${id} not found`);
        }
        
        try {
            const response = await this.removeFromS3(image.key);

            if (response.$metadata.httpStatusCode !== 204) {
                throw new Error('Image was not removed from s3');
            }

            return this.imageRepository.remove(image);
        } catch (err) {
            this.logger.error('Cannot remove file from s3');
            throw err;
        }
    }

    async removeFromS3(key: string) {
        const input: DeleteObjectCommandInput = {
            Bucket: this.bucket,
            Key: key
        }

        return await this.s3.send(new DeleteObjectCommand(input));
    }

    async uploadToS3(imageFile: Express.Multer.File, key: string): Promise<string> {
        const input: PutObjectCommandInput = {
            Body: imageFile.buffer,
            Bucket: this.bucket,
            Key: key,
            ContentType: imageFile.mimetype,
            ACL: 'public-read'
        }

        try {
            const response = await this.s3.send(new PutObjectCommand(input));

            if (response.$metadata.httpStatusCode !== 200) {
                throw new Error('Image was not saved to s3');
            }

            return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
        } catch (err) {
            this.logger.error('Cannot save file inside s3');
            throw err;
        }
    }
}
