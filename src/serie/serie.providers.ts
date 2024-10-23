// src/series/serie.providers.ts
// import { SerieEntity } from "./serie.entity";
import { DataSource } from "typeorm";
import { SERIE } from "./serie.entity";

export const serieProviders = [
    {
        provide: 'SERIES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SERIE),
        inject: ['DATA_SOURCE'],
    },
];