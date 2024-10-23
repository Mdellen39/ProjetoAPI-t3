// src/series/dto/criaSerie.dto.ts
import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// DTO responsável por receber dados de criação de uma nova série
export class CriaSerieDTO {
    @IsString()
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @ApiProperty({
        example: "Nome da Série",
        description: "Nome da série que está sendo criada",
    })
    NOME: string;

    @IsString()
    @IsNotEmpty({ message: "ano não pode ser vazio" })
    @ApiProperty({
        example: "2024",
        description: "Ano de lançamento da série, deve ser informado como texto",
    })
    ANO: string;

    @IsString()
    @IsNotEmpty({ message: "sinopse não pode ser vazia" })
    @ApiProperty({
        example: "Uma série que conta a história de...",
        description: "Sinopse da série que está sendo inserida",
    })
    SINOPSE: string;

    @IsString()
    @IsNotEmpty({ message: "temporada não pode ser vazia" })
    @ApiProperty({
        example: "1",
        description: "Número da temporada da série",
    })
    TEMPORADA: string;

    @IsString()
    @IsNotEmpty({ message: "episódio não pode ser vazio" })
    @ApiProperty({
        example: "1",
        description: "Número do episódio da série",
    })
    EPISODIO: string;

    @IsOptional() // Se IDfilme não for obrigatório, use IsOptional
    @IsString()
    @ApiProperty({
        example: "1a057a24-8b3b-444a-b305-dad891d363f7",
        description: "ID do filme associado à série",
    })
    IDFILME?: string; // Usando ? para indicar que é opcional
    GENERO: string;
}



