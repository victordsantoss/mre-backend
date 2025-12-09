import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { NewsModule } from './modules/news/news.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CommonModule,
    NewsModule,
    IntegrationsModule,
    AddressModule,
  ],
})
export class AppModule {}
