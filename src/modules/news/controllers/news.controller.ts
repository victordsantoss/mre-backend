import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { IListNewsService } from '../services/list/list.interface';
import { IListNewsRequestDto, IListNewsResponseDto } from '../dtos/list.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    @Inject('IListNewsService')
    private readonly listNewsService: IListNewsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar notícias com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de notícias.',
    type: IListNewsResponseDto,
  })
  async list(
    @Query() filters: IListNewsRequestDto,
  ): Promise<IListNewsResponseDto> {
    return await this.listNewsService.perform(filters);
  }
}
