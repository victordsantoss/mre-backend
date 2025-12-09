import { NewsRepository } from "../repository/news.repository";
import { ListNewsService } from "../services/list/list.service";

export const newsProvider = [{
        provide: 'IListNewsService',
        useClass: ListNewsService,
      },
      {
        provide: 'INewsRepository',
        useClass: NewsRepository,
      },
];