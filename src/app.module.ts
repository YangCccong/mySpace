import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
// import { CatsController } from './cats.controller';
// import { UsersModule } from './users/users.module';
// import { Test1Module } from './test-1/test-1.module';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
/**
 * 应用程序的根模块
 */
@Module({
  imports: [CatsModule],
  // controllers: [AppController, CatsController],
  // providers: [AppService, CatsService],
})
export class AppModule {}
