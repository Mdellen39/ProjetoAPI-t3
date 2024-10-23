import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class AlteraSerieDTO {

    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    @ApiPropertyOptional({
        example: "A volta dos que não foram - Série",
        description: "Nome da série, deve ser informado um texto contendo o nome"
    })
    NOME: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: "45",
        description: "Duração da série em minutos por episódio, deve ser informado como number"
    })
    DURACAO: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Uma série que conta a historia de ......",
        description: "Sinopse da série que está sendo inserida"
    })
    SINOPSE: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "2023",
        description: "Ano de lançamento da série, deve ser informado como texto"
    })
    ANO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "1a057a24-8b3b-444a-b305-dad891d363f7",
        description: "ID do Gênero da série a ser inserida"
    })
    GENERO: string;

}
