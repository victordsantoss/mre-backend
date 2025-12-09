import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/database/entities/news.entity';
import { NewsController } from './controllers/news.controller';
import { newsProvider } from './providers/news.provider';

@Module({
  imports: [TypeOrmModule.forFeature([News], 'mre')],
  controllers: [NewsController],
  providers: [...newsProvider],
  exports: [...newsProvider],
})
export class NewsModule {}
