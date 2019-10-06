import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({ ...typeOrmConfig }), TasksModule, AuthModule],
})
export class AppModule {}
