import { IBaseRepository } from 'src/common/repositories/base.repository.interface';
import { News } from 'src/database/entities/news.entity';

export interface INewsRepository extends IBaseRepository<News> {}
