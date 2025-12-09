import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty({
    description: 'Código único da notícia (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  code: string;

  @ApiProperty({
    description: 'Título da notícia',
    example: 'Título da notícia',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Descrição detalhada da notícia',
  })
  description: string;

  @ApiProperty({
    description: 'Data de publicação da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  publicationDate: Date;

  @ApiProperty({
    description: 'Data de criação da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  creationDate: Date;

  @ApiProperty({
    description: 'Data de atualização da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  updateDate: Date;
}
