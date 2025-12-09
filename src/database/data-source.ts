import { DataSource } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { News } from './entities/news.entity';

export const entities = [News];

export const createDataSource = () => {
  const port = process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432;

  const host = process.env.DATABASE_HOST;
  const username = process.env.DATABASE_USERNAME;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;

  return new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    entities,
  });
};

export const lwForFeature: EntityClassOrSchema[] = entities;
