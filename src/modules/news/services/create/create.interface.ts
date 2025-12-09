import {
  CreateNewsRequestDto,
  CreateNewsResponseDto,
} from '../../dtos/create.dto';

export interface ICreateNewsService {
  perform(data: CreateNewsRequestDto): Promise<CreateNewsResponseDto>;
}
