import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICreateNewsService } from './create.interface';
import type { INewsRepository } from '../../repository/news.interface';
import {
  CreateNewsRequestDto,
  CreateNewsResponseDto,
} from '../../dtos/create.dto';

@Injectable()
export class CreateNewsService implements ICreateNewsService {
  private readonly logger = new Logger(CreateNewsService.name);

  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async perform(data: CreateNewsRequestDto): Promise<CreateNewsResponseDto> {
    this.logger.log('Criando nova notícia');

    const news = await this.newsRepository.create({
      title: data.title,
      description: data.description,
      publicationDate: data.publicationDate,
    });

    return news.toDto();
  }
}
