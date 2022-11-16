import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '192.168.1.7',()=>{
    console.log("Server is running on port 3000");
  });
}
bootstrap();
