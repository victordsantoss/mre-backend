import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsDto } from 'src/modules/news/dtos/list.dto';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;

  toDto(): NewsDto {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: this.dataAtualizacao,
    };
  }
}
