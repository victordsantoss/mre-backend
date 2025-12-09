import {
  Controller,
  Get,
  Inject,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { GetAddressResponseDto } from '../dtos/get.dto';
import type { IGetAddressService } from '../services/get.interface';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(
    @Inject('IGetAddressService')
    private readonly getAddressService: IGetAddressService,
  ) {}

  @Get(':cep')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar endereço por CEP' })
  @ApiParam({
    name: 'cep',
    description: 'CEP para busca (com ou sem formatação)',
    example: '01001000',
  })
  @ApiResponse({
    status: 200,
    description: 'Endereço encontrado com sucesso.',
    type: GetAddressResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'CEP inválido.',
  })
  @ApiResponse({
    status: 404,
    description: 'CEP não encontrado.',
  })
  async get(@Param('cep') cep: string): Promise<GetAddressResponseDto> {
    return await this.getAddressService.perform(cep);
  }
}
  