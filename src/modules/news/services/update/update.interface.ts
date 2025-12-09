import {
  UpdateNewsRequestDto,
  UpdateNewsResponseDto,
} from '../../dtos/update.dto';

export interface IUpdateNewsService {
  perform(
    codigo: string,
    data: UpdateNewsRequestDto,
  ): Promise<UpdateNewsResponseDto>;
}
