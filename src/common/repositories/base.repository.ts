import {
  Repository,
  EntityTarget,
  DataSource,
  DeepPartial,
  UpdateResult,
  ObjectLiteral,
} from 'typeorm';
import { IBaseRepository, PaginatedResult } from './base.repository.interface';
import { BasePaginationRequestDto } from '../dtos/base-pagination.dto';

export abstract class BaseRepository<
  Entity extends ObjectLiteral,
  CreateInput extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateInput = DeepPartial<Entity>,
> implements IBaseRepository<Entity, CreateInput, UpdateInput> {
  protected readonly repository: Repository<Entity>;

  constructor(
    protected readonly dataSource: DataSource,
    protected readonly entity: EntityTarget<Entity>,
  ) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  public async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<Entity | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  public async create(data: CreateInput): Promise<Entity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  public async update(id: string, data: any): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findOneBy<K extends keyof Entity>(
    field: K,
    value: Entity[K],
  ): Promise<Entity | null> {
    return this.repository.findOne({ where: { [field]: value } as any });
  }

  public async findByFilters(
    filters: BasePaginationRequestDto,
  ): Promise<PaginatedResult<Entity>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('entity');

    if (filters.orderBy) {
      const sortBy = filters.sortBy || 'ASC';
      queryBuilder.orderBy(`entity.${filters.orderBy}`, sortBy);
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  public async deleteAll(): Promise<void> {
    await this.repository.clear();
  }
}
