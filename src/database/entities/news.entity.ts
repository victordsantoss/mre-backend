import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
} from 'typeorm';
import { NewsDto } from 'src/modules/news/dtos/news.dto';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', unique: true, name: 'codigo' })
  @Generated('uuid')
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'titulo' })
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'descricao' })
  description: string;

  @Column({ type: 'timestamp', name: 'data_publicacao' })
  publicationDate: Date;

  @CreateDateColumn({ name: 'data_criacao' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updateDate: Date;

  @DeleteDateColumn({ name: 'data_delecao' })
  deletionDate: Date;

  toDto(): NewsDto {
    return {
      code: this.code,
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      updateDate: this.updateDate,
      publicationDate: this.publicationDate,
    };
  }
}
