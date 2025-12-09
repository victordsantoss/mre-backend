import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Inject,
  Query,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import type { IListNewsService } from '../services/list/list.interface';
import type { ICreateNewsService } from '../services/create/create.interface';
import type { IGetNewsService } from '../services/get/get.interface';
import type { IUpdateNewsService } from '../services/update/update.interface';
import type { IDeleteNewsService } from '../services/delete/delete.interface';
import { IListNewsRequestDto, IListNewsResponseDto } from '../dtos/list.dto';
import {
  CreateNewsRequestDto,
  CreateNewsResponseDto,
} from '../dtos/create.dto';
import { GetNewsResponseDto } from '../dtos/get.dto';
import {
  UpdateNewsRequestDto,
  UpdateNewsResponseDto,
} from '../dtos/update.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    @Inject('IListNewsService')
    private readonly listNewsService: IListNewsService,
    @Inject('ICreateNewsService')
    private readonly createNewsService: ICreateNewsService,
    @Inject('IGetNewsService')
    private readonly getNewsService: IGetNewsService,
    @Inject('IUpdateNewsService')
    private readonly updateNewsService: IUpdateNewsService,
    @Inject('IDeleteNewsService')
    private readonly deleteNewsService: IDeleteNewsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova notícia' })
  @ApiResponse({
    status: 201,
    description: 'Notícia criada com sucesso.',
    type: CreateNewsResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  async create(
    @Body() data: CreateNewsRequestDto,
  ): Promise<CreateNewsResponseDto> {
    return await this.createNewsService.perform(data);
  }

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

  @Get(':codigo')
  @ApiOperation({ summary: 'Buscar detalhes de uma notícia por código' })
  @ApiParam({
    name: 'codigo',
    description: 'Código único da notícia (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da notícia.',
    type: GetNewsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Notícia não encontrada.',
  })
  async get(@Param('codigo') codigo: string): Promise<GetNewsResponseDto> {
    return await this.getNewsService.perform(codigo);
  }

  @Put(':codigo')
  @ApiOperation({ summary: 'Atualizar uma notícia' })
  @ApiParam({
    name: 'codigo',
    description: 'Código único da notícia (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Notícia atualizada com sucesso.',
    type: UpdateNewsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Notícia não encontrada.',
  })
  async update(
    @Param('codigo') codigo: string,
    @Body() data: UpdateNewsRequestDto,
  ): Promise<UpdateNewsResponseDto> {
    return await this.updateNewsService.perform(codigo, data);
  }

  @Delete(':codigo')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar uma notícia (soft delete)' })
  @ApiParam({
    name: 'codigo',
    description: 'Código único da notícia (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'Notícia deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Notícia não encontrada.',
  })
  async delete(@Param('codigo') codigo: string): Promise<void> {
    return await this.deleteNewsService.perform(codigo);
  }
}
