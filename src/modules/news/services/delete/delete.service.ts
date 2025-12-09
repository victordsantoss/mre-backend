import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IDeleteNewsService } from './delete.interface';
import type { INewsRepository } from '../../repository/news.interface';

@Injectable()
export class DeleteNewsService implements IDeleteNewsService {
  private readonly logger = new Logger(DeleteNewsService.name);

  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async perform(code: string): Promise<void> {
    this.logger.log(`Deletando notícia com código: ${code}`);

    const news = await this.newsRepository.findOneBy('code', code);

    if (!news) {
      throw new NotFoundException(`Notícia com código ${code} não encontrada`);
    }

    await this.newsRepository.softDelete(news.id);
  }
}
