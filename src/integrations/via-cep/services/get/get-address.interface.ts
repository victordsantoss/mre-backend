import { CepResponseDto } from "../../dtos/cep.dto";

export interface IViaCepGetAddressService {
  perform(cep: string): Promise<CepResponseDto>;
}   