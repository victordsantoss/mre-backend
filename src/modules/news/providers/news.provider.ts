import { NewsRepository } from '../repository/news.repository';
import { ListNewsService } from '../services/list/list.service';
import { CreateNewsService } from '../services/create/create.service';
import { GetNewsService } from '../services/get/get.service';
import { UpdateNewsService } from '../services/update/update.service';
import { DeleteNewsService } from '../services/delete/delete.service';

export const newsProvider = [
  {
    provide: 'IListNewsService',
    useClass: ListNewsService,
  },
  {
    provide: 'ICreateNewsService',
    useClass: CreateNewsService,
  },
  {
    provide: 'IGetNewsService',
    useClass: GetNewsService,
  },
  {
    provide: 'IUpdateNewsService',
    useClass: UpdateNewsService,
  },
  {
    provide: 'IDeleteNewsService',
    useClass: DeleteNewsService,
  },
  {
    provide: 'INewsRepository',
    useClass: NewsRepository,
  },
];
