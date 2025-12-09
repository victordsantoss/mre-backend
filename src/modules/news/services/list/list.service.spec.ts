import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ListNewsService } from './list.service';
import type { INewsRepository } from '../../repository/news.interface';
import { IListNewsRequestDto } from '../../dtos/list.dto';
import { News } from 'src/database/entities';
import { PaginatedResult } from 'src/common/repositories/base.repository.interface';

describe('ListNewsService', () => {
  let service: ListNewsService;
  let newsRepository: jest.Mocked<INewsRepository>;

  const mockNewsRepository = {
    create: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    findByFilters: jest.fn(),
  };

  const mockNews1: News = {
    id: 1,
    code: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Primeira notícia',
    description: 'Descrição da primeira notícia',
    publicationDate: new Date('2024-01-01'),
    creationDate: new Date('2024-01-01'),
    updateDate: new Date('2024-01-01'),
    deletionDate: null,
    toDto: jest.fn().mockReturnValue({
      code: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Primeira notícia',
      description: 'Descrição da primeira notícia',
      publicationDate: new Date('2024-01-01'),
      creationDate: new Date('2024-01-01'),
      updateDate: new Date('2024-01-01'),
    }),
  };

  const mockNews2: News = {
    id: 2,
    code: '660e8400-e29b-41d4-a716-446655440000',
    title: 'Segunda notícia',
    description: 'Descrição da segunda notícia',
    publicationDate: new Date('2024-01-02'),
    creationDate: new Date('2024-01-02'),
    updateDate: new Date('2024-01-02'),
    deletionDate: null,
    toDto: jest.fn().mockReturnValue({
      code: '660e8400-e29b-41d4-a716-446655440000',
      title: 'Segunda notícia',
      description: 'Descrição da segunda notícia',
      publicationDate: new Date('2024-01-02'),
      creationDate: new Date('2024-01-02'),
      updateDate: new Date('2024-01-02'),
    }),
  };

  const mockPaginatedResult: PaginatedResult<News> = {
    data: [mockNews1, mockNews2],
    meta: {
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListNewsService,
        {
          provide: 'INewsRepository',
          useValue: mockNewsRepository,
        },
      ],
    }).compile();

    service = module.get<ListNewsService>(ListNewsService);
    newsRepository = module.get('INewsRepository');

    // Mock Logger to avoid console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('perform', () => {
    it('should list news successfully with default pagination', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
      };

      mockNewsRepository.findByFilters.mockResolvedValue(mockPaginatedResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(newsRepository.findByFilters).toHaveBeenCalledTimes(1);
      expect(newsRepository.findByFilters).toHaveBeenCalledWith(listNewsDto);
      expect(mockNews1.toDto).toHaveBeenCalledTimes(1);
      expect(mockNews2.toDto).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: [
          {
            code: '550e8400-e29b-41d4-a716-446655440000',
            title: 'Primeira notícia',
            description: 'Descrição da primeira notícia',
            publicationDate: new Date('2024-01-01'),
            creationDate: new Date('2024-01-01'),
            updateDate: new Date('2024-01-01'),
          },
          {
            code: '660e8400-e29b-41d4-a716-446655440000',
            title: 'Segunda notícia',
            description: 'Descrição da segunda notícia',
            publicationDate: new Date('2024-01-02'),
            creationDate: new Date('2024-01-02'),
            updateDate: new Date('2024-01-02'),
          },
        ],
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('should list news with search filter', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
        search: 'primeira',
      };

      const filteredResult: PaginatedResult<News> = {
        data: [mockNews1],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockNewsRepository.findByFilters.mockResolvedValue(filteredResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(newsRepository.findByFilters).toHaveBeenCalledWith(listNewsDto);
      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(1);
    });

    it('should log the listing message', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
      };

      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockNewsRepository.findByFilters.mockResolvedValue(mockPaginatedResult);

      // Act
      await service.perform(listNewsDto);

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Listando dados de notícias');
    });

    it('should return empty list when no news found', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
      };

      const emptyResult: PaginatedResult<News> = {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      };

      mockNewsRepository.findByFilters.mockResolvedValue(emptyResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });

    it('should handle custom page and limit', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 2,
        limit: 5,
      };

      const customPaginatedResult: PaginatedResult<News> = {
        data: [mockNews1],
        meta: {
          total: 10,
          page: 2,
          limit: 5,
          totalPages: 2,
        },
      };

      mockNewsRepository.findByFilters.mockResolvedValue(customPaginatedResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(newsRepository.findByFilters).toHaveBeenCalledWith(listNewsDto);
      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.totalPages).toBe(2);
    });

    it('should handle pagination with orderBy and sortBy', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
        orderBy: 'title',
        sortBy: 'ASC',
      };

      mockNewsRepository.findByFilters.mockResolvedValue(mockPaginatedResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(newsRepository.findByFilters).toHaveBeenCalledWith(listNewsDto);
      expect(result.data).toHaveLength(2);
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
      };

      const error = new Error('Database error');
      mockNewsRepository.findByFilters.mockRejectedValue(error);

      // Act & Assert
      await expect(service.perform(listNewsDto)).rejects.toThrow('Database error');
      expect(newsRepository.findByFilters).toHaveBeenCalledTimes(1);
    });

    it('should transform all news entities to DTOs', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 1,
        limit: 10,
      };

      mockNewsRepository.findByFilters.mockResolvedValue(mockPaginatedResult);

      // Act
      await service.perform(listNewsDto);

      // Assert
      expect(mockNews1.toDto).toHaveBeenCalled();
      expect(mockNews2.toDto).toHaveBeenCalled();
    });

    it('should handle large datasets with correct pagination metadata', async () => {
      // Arrange
      const listNewsDto: IListNewsRequestDto = {
        page: 3,
        limit: 20,
      };

      const largePaginatedResult: PaginatedResult<News> = {
        data: [mockNews1, mockNews2],
        meta: {
          total: 100,
          page: 3,
          limit: 20,
          totalPages: 5,
        },
      };

      mockNewsRepository.findByFilters.mockResolvedValue(largePaginatedResult);

      // Act
      const result = await service.perform(listNewsDto);

      // Assert
      expect(result.meta.total).toBe(100);
      expect(result.meta.page).toBe(3);
      expect(result.meta.limit).toBe(20);
      expect(result.meta.totalPages).toBe(5);
    });
  });
});

