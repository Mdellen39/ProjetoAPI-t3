// classe de módulo do série, responsável por administrar todo o módulo de série, incluindo controller, DM, e validators, 
// tudo o que o módulo de série contém, é administrado pela classe de módulo

import { Module } from '@nestjs/common';
import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from 'src/pessoa/pessoa.providers';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { generoProviders } from 'src/genero/genero.provider'; // se houver necessidade de generos

@Module({
  imports: [DatabaseModule],
  controllers: [SerieController],
  providers: [
    SerieService,
    ...pessoaProviders,
    PessoaService,
    ...generoProviders, // se necessário
  ],
})
export class SerieModule {}

