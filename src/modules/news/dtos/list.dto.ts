import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BasePaginationRequestDto } from 'src/common/dtos/base-pagination.dto';
import { BasePaginationResponseDto } from 'src/common/dtos/base-pagination.dto';
import { NewsDto } from './news.dto';

export class IListNewsRequestDto extends BasePaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Termo de busca para filtrar notícias por título ou descrição',
    example: 'tecnologia',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class IListNewsResponseDto extends BasePaginationResponseDto<NewsDto> {
  @ApiProperty({
    description: 'Lista de notícias',
    type: [NewsDto],
  })
  declare data: NewsDto[];
}
