import { GetAddressResponseDto } from '../dtos/get.dto';

export interface IGetAddressService {
  perform(cep: string): Promise<GetAddressResponseDto>;
}

