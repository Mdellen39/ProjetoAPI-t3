// classe DTO para retorno de listagem padronizada de séries
// DTO é "data transfer object" ou objeto de transferência de dados, ou seja, é um tipo de classe para transferir dados
export class ListaSerieDTO {
    // dtos de resposta normalmente não têm nenhuma validação, apenas o constructor com os campos a serem retornados
    constructor(
        readonly id: string, 
        readonly nome: string,
        readonly duracao: number,
        readonly sinopse: string
    ) {}
}

export class ListagemSeriesDTO {
    constructor(
        readonly serie: ListaSerieDTO[],
    ) {}
}
