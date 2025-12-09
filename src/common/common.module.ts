import { Global, Module } from '@nestjs/common';
import { CpfValidator } from './utils/cpf.utils';

@Global()
@Module({
  providers: [CpfValidator],
  exports: [CpfValidator],
})
export class CommonModule {}
