import { Module } from '@nestjs/common';

import { ViaCepGetAddressService } from './services/get/get-address.service';

@Module({
  providers: [{
    provide: 'IViaCepGetAddressService',
    useClass: ViaCepGetAddressService,
  }],
  exports: ['IViaCepGetAddressService'],
  controllers: [],
})
export class ViaCepModule {}
