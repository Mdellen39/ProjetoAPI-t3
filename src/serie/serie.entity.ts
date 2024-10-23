import { PESSOA } from "src/pessoa/pessoa.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { GENERO } from "src/genero/genero.entity";

@Entity('series')
export class SERIE {
    @PrimaryGeneratedColumn('uuid')
    ID: string; // Alterado para UUID se necessário

    @Column({ length: 255 })
    NOME: string;

    @Column()
    TEMPORADA: number;

    @Column()
    EPISODIO: number;

    @Column({ length: 255 })
    ANO: string; // Alterado para string para manter a consistência

    @Column({ length: 255 })
    SINOPSE: string;

    @ManyToOne(() => GENERO, genero => genero.series) // Atualize aqui para referência correta
    @JoinColumn({ name: 'IDGENERO', referencedColumnName: 'ID' })
    genero: GENERO;

    @ManyToMany(
        () => PESSOA,
        ator => ator.series, // Altere para a propriedade correspondente na entidade PESSOA
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    atores?: PESSOA[];
}



