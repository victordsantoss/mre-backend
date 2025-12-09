import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { News } from 'src/database/entities/news.entity';
import { INewsRepository } from './news.interface';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class NewsRepository
  extends BaseRepository<News>
  implements INewsRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, News);
  }
}
