import { Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { IListNewsService } from './list.interface';
import type { INewsRepository } from '../../repository/news.interface';
import { IListNewsRequestDto } from '../../dtos/list.dto';
import { IListNewsResponseDto } from '../../dtos/list.dto';

@Injectable()
export class ListNewsService implements IListNewsService {
  private readonly logger = new Logger(ListNewsService.name);

  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async perform(data: IListNewsRequestDto): Promise<IListNewsResponseDto> {
    this.logger.log('Listando dados de notícias');
    const result = await this.newsRepository.findByFilters(data);
    return {
      data: result.data.map((news) => news.toDto()),
      meta: result.meta,
    };
  }
}
