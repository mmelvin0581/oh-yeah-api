import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    }),
    TasksModule,
  ],
})
export class AppModule {}
