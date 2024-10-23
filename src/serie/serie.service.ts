// src/series/serie.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { CriaSerieDTO } from './dto/criaserie.dto';
import { AlteraSerieDTO } from './dto/alteraserie.dto';
import { GeneroService } from 'src/genero/genero.service';
import { atorSerieDTO } from './dto/atorserie.dto';
import { SERIE } from './serie.entity';

@Injectable()
export class SerieService {
  constructor(
    @Inject('SERIES_REPOSITORY')
    private serieRepository: Repository<SERIE>,
    private readonly generoService: GeneroService,
  ) {}

  // Método para adicionar um ator à série (implementação ainda não definida)
  addAtor(dados: atorSerieDTO): RetornoCadastroDTO | PromiseLike<RetornoCadastroDTO> {
    throw new Error("Method not implemented.");
  }

  // Método para listar um ator por ID (implementação ainda não definida)
  listarAtor(id: string): import("../filme_pessoa/dto/retornoElenco.dto").RetornoElencoDTO | PromiseLike<import("../filme_pessoa/dto/retornoElenco.dto").RetornoElencoDTO> {
    throw new Error("Method not implemented.");
  }

  // Método para encontrar uma série por ID (implementação ainda não definida)
  encontrarPorId(id: string): CriaSerieDTO | PromiseLike<CriaSerieDTO> {
    throw new Error("Method not implemented.");
  }

  // Método para listar todas as séries
  async listar(): Promise<SERIE[]> {
    return this.serieRepository.find();
  }

  // Método para localizar uma série por ID
  async localizarID(ID: string): Promise<SERIE> {
    return this.serieRepository.findOne({
      where: {
        ID,
      },
    });
  }

  // Método para inserir uma nova série
  async inserir(dados: CriaSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = new SERIE();
    serie.ID = uuid(); // Utilize uuid se o ID não for gerado automaticamente
    serie.NOME = dados.NOME;
    serie.ANO = dados.ANO;
    // serie.EPISODIO = dados.EPISODIO;
    serie.SINOPSE = dados.SINOPSE;

    // Verifique se o GÊNERO é válido
    const genero = await this.generoService.localizarID(dados.GENERO);
    if (!genero) {
      return {
        id: '',
        message: "Gênero não encontrado.",
      };
    }
    serie.genero = genero;

    try {
      await this.serieRepository.save(serie);
      return {
        id: serie.ID,
        message: "Série cadastrada com sucesso!",
      };
    } catch (error) {
      return {
        id: '',
        message: "Houve um erro ao cadastrar. " + error.message,
      };
    }
  }

  // Método para alterar uma série existente
  async alterar(id: string, dados: AlteraSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);
    
    Object.entries(dados).forEach(async ([chave, valor]) => {
      if (chave === 'id') {
        return; // Ignora o ID
      }

      if (chave === 'GENERO') {
        serie['genero'] = await this.generoService.localizarID(valor); // Corrigido para 'genero'
        return;
      }

      if (valor) serie[chave] = valor;
    });

    try {
      await this.serieRepository.save(serie);
      return {
        id: serie.ID,
        message: "Série alterada com sucesso!",
      };
    } catch (error) {
      return {
        id: '',
        message: "Houve um erro ao alterar. " + error.message,
      };
    }
  }

  // Método para remover uma série
  async remover(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);
    
    try {
      await this.serieRepository.remove(serie);
      return {
        return: serie,
        message: "Série excluída com sucesso!",
      };
    } catch (error) {
      return {
        return: serie,
        message: "Houve um erro ao excluir. " + error.message,
      };
    }
  }

  // Método para compartilhar informações sobre a série
  async Compartilhar(id: string) {
    const serie = await this.serieRepository
      .createQueryBuilder('serie')
      .select('serie.ID', 'ID')
      .addSelect('serie.NOME', 'NOME_SERIE')
      .addSelect('serie.SINOPSE', 'SINOPSE')
      .addSelect('serie.ANO', 'ANO')
      .addSelect('serie.EPISODIOS', 'EPISODIOS')
      .addSelect('gen.NOME', 'GENERO')
      .leftJoin('genero', 'gen', 'serie.idgenero = gen.id')
      .andWhere('serie.ID = :ID', { ID: `${id}` })
      .getRawOne();

    return {
      message: `Estou assistindo a série ${serie.NOME_SERIE}, do gênero ${serie.GENERO}, que conta a seguinte história: ${serie.SINOPSE}. Foi lançada em ${serie.ANO} e tem ${serie.EPISODIOS} episódios. Assista também!!`,
    };
  }
}
