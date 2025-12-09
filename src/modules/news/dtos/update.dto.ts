import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';
import { NewsDto } from './news.dto';

export class UpdateNewsRequestDto {
  @ApiProperty({
    description: 'Título da notícia',
    example: 'Título da notícia',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Descrição detalhada da notícia',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Data de publicação da notícia',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  publicationDate?: Date;
}

export class UpdateNewsResponseDto extends NewsDto {}
