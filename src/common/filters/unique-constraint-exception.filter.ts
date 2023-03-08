import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PostgresErrorCode } from '../../database/error_codes/postgressErrorCode.enum';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintExceptionFilter<T extends QueryFailedError> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        if (exception.driverError.code === PostgresErrorCode.UniqueViolation) {
            response.status(HttpStatus.CONFLICT).json({
                'statusCode': 409,
                'message': 'Entity with this name already exists',
                'error': 'Conflict'
            })
        }
    }
}
