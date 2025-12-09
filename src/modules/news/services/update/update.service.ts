import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IUpdateNewsService } from './update.interface';
import type { INewsRepository } from '../../repository/news.interface';
import {
  UpdateNewsRequestDto,
  UpdateNewsResponseDto,
} from '../../dtos/update.dto';
import { News } from 'src/database/entities';
import { NewsDto } from '../../dtos/news.dto';

@Injectable()
export class UpdateNewsService implements IUpdateNewsService {
  private readonly logger = new Logger(UpdateNewsService.name);

  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async perform(
    codigo: string,
    data: UpdateNewsRequestDto,
  ): Promise<UpdateNewsResponseDto> {
    this.logger.log(`Atualizando notícia com código: ${codigo}`);

    const news = await this.findOneByCode(codigo);
    await this.newsRepository.update(news.id, data);

    const updatedNews = await this.findUpdatedNews(codigo);

    return updatedNews;
  }

  private async findOneByCode(code: string): Promise<News> {
    const news = await this.newsRepository.findOneBy('code', code);

    if (!news) {
      throw new NotFoundException(`Notícia com código ${code} não encontrada`);
    }
    return news;
  }

  private async findUpdatedNews(code: string): Promise<NewsDto> {
    const updatedNews = await this.newsRepository.findOneBy('code', code);

    if (!updatedNews) {
      throw new NotFoundException(`Notícia com código ${code} não encontrada`);
    }

    return updatedNews.toDto();
  }
}
