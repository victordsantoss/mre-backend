import { Inject, Injectable } from '@nestjs/common';
import { GetAddressResponseDto } from '../dtos/get.dto';
import { IGetAddressService } from './get.interface';
import type { IViaCepGetAddressService } from 'src/integrations/via-cep/services/get/get-address.interface';

@Injectable()
export class GetAddressService implements IGetAddressService {
  constructor(
    @Inject('IViaCepGetAddressService')
    private readonly viaCepGetAddressService: IViaCepGetAddressService,
  ) {}

  async perform(cep: string): Promise<GetAddressResponseDto> {
    const addressData = await this.viaCepGetAddressService.perform(cep);

    return {
      cep: addressData.cep,
      street: addressData.street,
      complement: addressData.complement,
      district: addressData.district,
      city: addressData.city,
      state: addressData.state,
      ibge: addressData.ibge,
      gia: addressData.gia,
      areaCode: addressData.areaCode,
      siafi: addressData.siafi,
    };
  }
}

