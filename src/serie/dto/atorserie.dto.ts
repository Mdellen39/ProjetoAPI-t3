import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class atorSerieDTO {
    @IsString()
    @IsNotEmpty({ message: "ID Não pode ser vazio" })
    @ApiPropertyOptional({
        example: '',
        description: `Deve ser informado o ID do ator a ser vinculado à série.`,
    })
    IDATOR: string;

    @IsString()
    @ApiPropertyOptional({
        example: '',
        description: `Deve ser informado o ID da série a vincular com o ATOR.`,
    })
    IDSERIE: string;

    @IsString()
    @ApiPropertyOptional({
        example: 'ATOR',
        description: `Deve ser informado a função na série, como ATOR, DIRETOR.`,
    })
    FUNCAO: string;
}
