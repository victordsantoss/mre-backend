import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address.controller';
import { GetAddressService } from './services/get.service';
import { ViaCepModule } from 'src/integrations/via-cep/via-cep.module';

@Module({
  imports: [ViaCepModule],
  controllers: [AddressController],
  providers: [
    GetAddressService,
    {
      provide: 'IGetAddressService',
      useExisting: GetAddressService,
    },
  ],
  exports: ['IGetAddressService'],
})
export class AddressModule {}
