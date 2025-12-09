import { DeepPartial, UpdateResult } from 'typeorm';
import {
  BasePaginationRequestDto,
  PaginationMeta,
} from '../dtos/base-pagination.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface IBaseRepository<
  Entity,
  CreateInput = DeepPartial<Entity>,
  UpdateInput = DeepPartial<Entity>,
> {
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  create(data: CreateInput): Promise<Entity>;
  update(id: string, data: UpdateInput): Promise<UpdateResult>;
  delete(id: string): Promise<void>;
  findOneBy<K extends keyof Entity>(
    field: K,
    value: Entity[K],
  ): Promise<Entity | null>;
  findByFilters(
    filters: BasePaginationRequestDto,
  ): Promise<PaginatedResult<Entity>>;
}
