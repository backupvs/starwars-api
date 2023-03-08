import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UniqueConstraintExceptionFilter } from "./common/filters/unique-constraint-exception.filter";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response.interceptor";
import { SeederService } from "./database/seeder/seeder.service";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  // Global filters
  app.useGlobalFilters(new UniqueConstraintExceptionFilter())

  // Global interceptors
  app.useGlobalInterceptors(new WrapResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('API to work with data from Star Wars')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
