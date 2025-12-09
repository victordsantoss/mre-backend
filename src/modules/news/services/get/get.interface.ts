import { GetNewsResponseDto } from '../../dtos/get.dto';

export interface IGetNewsService {
  perform(codigo: string): Promise<GetNewsResponseDto>;
}
