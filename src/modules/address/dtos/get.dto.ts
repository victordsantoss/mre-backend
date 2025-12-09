import { ApiProperty } from '@nestjs/swagger';

export class GetAddressResponseDto {
  @ApiProperty({
    description: 'CEP formatado',
    example: '01001-000',
  })
  cep: string;

  @ApiProperty({
    description: 'Nome da rua/logradouro',
    example: 'Praça da Sé',
  })
  street: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'lado ímpar',
  })
  complement: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Sé',
  })
  district: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'Estado (UF)',
    example: 'SP',
  })
  state: string;

  @ApiProperty({
    description: 'Código IBGE',
    example: '3550308',
  })
  ibge: string;

  @ApiProperty({
    description: 'Código GIA',
    example: '1004',
  })
  gia: string;

  @ApiProperty({
    description: 'DDD da região',
    example: '11',
  })
  areaCode: string;

  @ApiProperty({
    description: 'Código SIAFI',
    example: '7107',
  })
  siafi: string;
}

