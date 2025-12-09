import { Module } from '@nestjs/common';
import { ViaCepModule } from './via-cep/via-cep.module';

@Module({
  imports: [ViaCepModule],
  controllers: [],
  providers: [],
  exports: [ViaCepModule],
})
export class IntegrationsModule {}
