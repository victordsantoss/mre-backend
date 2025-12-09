import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { News } from 'src/database/entities/news.entity';
import { INewsRepository } from './news.interface';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { IListNewsRequestDto } from '../dtos/list.dto';
import { PaginatedResult } from 'src/common/repositories/base.repository.interface';

@Injectable()
export class NewsRepository
  extends BaseRepository<News>
  implements INewsRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, News);
  }

  async findByFilters(
    filters: IListNewsRequestDto,
  ): Promise<PaginatedResult<News>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('entity');

    if (filters.search) {
      queryBuilder.where(
        '(LOWER(entity.title) LIKE LOWER(:search) OR LOWER(entity.description) LIKE LOWER(:search))',
        { search: `%${filters.search}%` },
      );
    }

    if (filters.orderBy) {
      const sortBy = filters.sortBy || 'ASC';
      queryBuilder.orderBy(`entity.${filters.orderBy}`, sortBy);
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
