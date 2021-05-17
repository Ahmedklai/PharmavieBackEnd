import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(csurf());
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('Pharmavie')
  .setDescription('Pharmavie API description')
  .setVersion('1.0')
  .addTag('first')
  .build();
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
