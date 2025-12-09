import { IsString } from 'class-validator';

export class CepResponseDto {
  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  ibge: string;

  @IsString()
  gia: string;

  @IsString()
  areaCode: string;

  @IsString()
  siafi: string;
}
