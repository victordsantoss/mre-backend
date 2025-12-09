import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IGetNewsService } from './get.interface';
import type { INewsRepository } from '../../repository/news.interface';
import { GetNewsResponseDto } from '../../dtos/get.dto';

@Injectable()
export class GetNewsService implements IGetNewsService {
  private readonly logger = new Logger(GetNewsService.name);

  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async perform(code: string): Promise<GetNewsResponseDto> {
    this.logger.log(`Buscando notícia com código: ${code}`);

    const news = await this.newsRepository.findOneBy('code', code);

    if (!news) {
      throw new NotFoundException(`Notícia com código ${code} não encontrada`);
    }

    return news.toDto();
  }
}
