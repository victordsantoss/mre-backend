import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationRequestDto } from 'src/common/dtos/base-pagination.dto';
import { BasePaginationResponseDto } from 'src/common/dtos/base-pagination.dto';

export class NewsDto {
  @ApiProperty({
    description: 'ID da notícia',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Título da notícia',
    example: 'Título da notícia',
  })
  titulo: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Descrição detalhada da notícia',
  })
  descricao: string;

  @ApiProperty({
    description: 'Data de criação da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  dataCriacao: Date;

  @ApiProperty({
    description: 'Data de atualização da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  dataAtualizacao: Date;
}

export class IListNewsRequestDto extends BasePaginationRequestDto {}

export class IListNewsResponseDto extends BasePaginationResponseDto<NewsDto> {
  @ApiProperty({
    description: 'Lista de notícias',
    type: [NewsDto],
  })
  declare data: NewsDto[];
}
