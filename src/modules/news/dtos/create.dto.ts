import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { NewsDto } from './news.dto';

export class CreateNewsRequestDto {
  @ApiProperty({
    description: 'Título da notícia',
    example: 'Título da notícia',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Descrição detalhada da notícia',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Data de publicação da notícia',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  publicationDate: Date;
}

export class CreateNewsResponseDto extends NewsDto {}
