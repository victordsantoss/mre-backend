import { IListNewsRequestDto, IListNewsResponseDto } from '../../dtos/list.dto';

export interface IListNewsService {
  perform(filters: IListNewsRequestDto): Promise<IListNewsResponseDto>;
}
