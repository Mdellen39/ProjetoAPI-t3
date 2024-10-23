import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AlteraSerieDTO} from "./dto/alteraSerie.dto";
import { SerieService } from "./serie.service";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { CriaSerieDTO } from "./dto/criaserie.dto";
import { ListaSerieDTO } from "./dto/listaserie.dto";
import { atorSerieDTO } from "./dto/atorserie.dto";
import { RetornoElencoDTO } from "src/filme_pessoa/dto/retornoElenco.dto";

@ApiTags('serie')
@Controller('/series')
export class SerieController {
    constructor(private readonly serieService: SerieService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Retorna que houve sucesso na inclusão' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na inclusão.' })
    @ApiResponse({ status: 400, description: 'Retorna que há algum dado inválido na requisição.' })
    async criaSerie(@Body() dadosSerie: CriaSerieDTO): Promise<RetornoCadastroDTO> {
        var retorno = this.serieService.inserir(dadosSerie);
        return retorno;
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na alteração' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na alteração.' })
    @ApiResponse({ status: 400, description: 'Retorna que há algum dado inválido na requisição.' })
    async alteraSerie(@Body() dadosNovos: AlteraSerieDTO, @Param('id') id: string) {
        var retornoAlteracao = this.serieService.alterar(id, dadosNovos);
        return retornoAlteracao;
    }

    @Delete('/ID:id')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na exclusão' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na exclusão.' })
    async removeSerie(@Param('id') id: string) {
        var retornoExclusao = await this.serieService.remover(id);
        return retornoExclusao;
    }

    @Get('/:ID')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na consulta' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na consulta.' })
    async retornaSerieId(@Param('ID') ID: string) {
        var seriesListadas = await this.serieService.Compartilhar(ID);
        return {
            Serie: seriesListadas
        };
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na consulta' })
    async retornaSerie(): Promise<ListaSerieDTO[]> {
        return this.serieService.listar();
    }

    @Post('/ator/')
    async addAtor(@Body() dados: atorSerieDTO): Promise<RetornoCadastroDTO> {
        return this.serieService.addAtor(dados);
    }

    @Delete('/ator/')
    async removeAtor(@Body() dados: atorSerieDTO): Promise<RetornoCadastroDTO> {
        return this.serieService.remover(dados);
    }

    @Get('/ator/:id')
    async listaElencoSerie(@Param('id') id: string): Promise<RetornoElencoDTO> {
        return this.serieService.listarAtor(id);
    }
}

