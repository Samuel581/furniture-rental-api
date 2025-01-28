import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Furniture Rentals API')
  .setDescription('  This API allows users to browse, rent, and manage furniture rentals. It provides endpoints for viewing available furniture, creating rental orders, updating rental details, and deleting rentals. The API ensures secure and efficient management of furniture rental operations.')
  .setVersion('1.0')
  .addTag('rental')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    origin: ['https://furniture-rental-client.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATHC'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
