import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { BaseViaCep } from '../base/base.service';
import { CepResponseDto } from '../../dtos/cep.dto';
import { ViaCepRoutes } from '../../types/via-cep.routes';
import { IViaCepGetAddressService } from './get-address.interface';

interface ViaCepApiResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable()
export class ViaCepGetAddressService
  extends BaseViaCep
  implements IViaCepGetAddressService
{
  protected maxRetries = 3;

  protected getViaCepRoute(): ViaCepRoutes {
    return ViaCepRoutes.getAddress;
  }

  public async perform(cep: string): Promise<CepResponseDto> {
    try {
      const cleanedCep = this.cleanCep(cep);
      if (!cleanedCep) {
        throw new HttpException(`CEP inválido.`, HttpStatus.BAD_REQUEST);
      }

      const formattedUrl = this.getViaCepRoute().replace(':cep', cleanedCep);

      const address = await this.makeRequest<ViaCepApiResponse, null>(
        'get',
        formattedUrl,
      );

      return {
        cep: address.cep,
        street: address.logradouro,
        complement: address.complemento,
        district: address.bairro,
        city: address.localidade,
        state: address.uf,
        ibge: address.ibge,
        gia: address.gia,
        areaCode: address.ddd,
        siafi: address.siafi,
      };
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar o CEP: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private cleanCep(cep: string): string {
    const result = cep.replace(/\D/g, '');
    return result.length === 8 ? result : '';
  }
}
