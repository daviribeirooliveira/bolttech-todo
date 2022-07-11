import { TasksModule } from './modules/tasks/tasks.providers';
import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.DATABASE_NAME,
      extra: {
        trustServerCertificate: true,
      },
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      synchronize: process.env.NODE_ENV === 'development',
      type: 'mssql',
      username: process.env.DATABASE_USERNAME,
    }),
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule { }
