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
  findById(id: number): Promise<Entity | null>;
  create(data: CreateInput): Promise<Entity>;
  update(id: number, data: UpdateInput): Promise<UpdateResult>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
  findOneBy<K extends keyof Entity>(
    field: K,
    value: Entity[K],
  ): Promise<Entity | null>;
  findByFilters(
    filters: BasePaginationRequestDto,
  ): Promise<PaginatedResult<Entity>>;
}
