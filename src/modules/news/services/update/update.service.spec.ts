import { Test, TestingModule } from '@nestjs/testing';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdateNewsService } from './update.service';
import type { INewsRepository } from '../../repository/news.interface';
import { UpdateNewsRequestDto } from '../../dtos/update.dto';
import { News } from 'src/database/entities';

describe('UpdateNewsService', () => {
  let service: UpdateNewsService;
  let newsRepository: jest.Mocked<INewsRepository>;

  const mockNewsRepository = {
    create: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    findByFilters: jest.fn(),
  };

  const mockNews: News = {
    id: 1,
    code: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Título da notícia',
    description: 'Descrição da notícia',
    publicationDate: new Date('2024-01-01'),
    creationDate: new Date('2024-01-01'),
    updateDate: new Date('2024-01-01'),
    deletionDate: null,
    toDto: jest.fn().mockReturnValue({
      code: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Título da notícia',
      description: 'Descrição da notícia',
      publicationDate: new Date('2024-01-01'),
      creationDate: new Date('2024-01-01'),
      updateDate: new Date('2024-01-01'),
    }),
  };

  const updatedMockNews: News = {
    ...mockNews,
    title: 'Título atualizado',
    description: 'Descrição atualizada',
    toDto: jest.fn().mockReturnValue({
      code: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Título atualizado',
      description: 'Descrição atualizada',
      publicationDate: new Date('2024-01-01'),
      creationDate: new Date('2024-01-01'),
      updateDate: new Date('2024-01-02'),
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateNewsService,
        {
          provide: 'INewsRepository',
          useValue: mockNewsRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateNewsService>(UpdateNewsService);
    newsRepository = module.get('INewsRepository');

    // Mock Logger to avoid console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('perform', () => {
    it('should update a news successfully', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
        description: 'Descrição atualizada',
      };

      mockNewsRepository.findOneBy
        .mockResolvedValueOnce(mockNews) // First call in findOneByCode
        .mockResolvedValueOnce(updatedMockNews); // Second call in findUpdatedNews

      mockNewsRepository.update.mockResolvedValue(undefined);

      // Act
      const result = await service.perform(code, updateNewsDto);

      // Assert
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(newsRepository.findOneBy).toHaveBeenNthCalledWith(1, 'code', code);
      expect(newsRepository.findOneBy).toHaveBeenNthCalledWith(2, 'code', code);
      expect(newsRepository.update).toHaveBeenCalledTimes(1);
      expect(newsRepository.update).toHaveBeenCalledWith(mockNews.id, updateNewsDto);
      expect(result).toEqual({
        code: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Título atualizado',
        description: 'Descrição atualizada',
        publicationDate: new Date('2024-01-01'),
        creationDate: new Date('2024-01-01'),
        updateDate: new Date('2024-01-02'),
      });
    });

    it('should throw NotFoundException when news is not found', async () => {
      // Arrange
      const code = 'non-existent-code';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
      };

      mockNewsRepository.findOneBy.mockResolvedValue(null);

      // Act & Assert
      await expect(service.perform(code, updateNewsDto)).rejects.toThrow(
        new NotFoundException(`Notícia com código ${code} não encontrada`),
      );
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(newsRepository.update).not.toHaveBeenCalled();
    });

    it('should log the update message', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
      };

      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockNewsRepository.findOneBy
        .mockResolvedValueOnce(mockNews)
        .mockResolvedValueOnce(updatedMockNews);
      mockNewsRepository.update.mockResolvedValue(undefined);

      // Act
      await service.perform(code, updateNewsDto);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(`Atualizando notícia com código: ${code}`);
    });

    it('should update only the provided fields', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Apenas título atualizado',
      };

      mockNewsRepository.findOneBy
        .mockResolvedValueOnce(mockNews)
        .mockResolvedValueOnce(updatedMockNews);
      mockNewsRepository.update.mockResolvedValue(undefined);

      // Act
      await service.perform(code, updateNewsDto);

      // Assert
      expect(newsRepository.update).toHaveBeenCalledWith(mockNews.id, {
        title: 'Apenas título atualizado',
      });
    });

    it('should throw NotFoundException when updated news is not found after update', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
      };

      mockNewsRepository.findOneBy
        .mockResolvedValueOnce(mockNews) // First call succeeds
        .mockResolvedValueOnce(null); // Second call fails
      mockNewsRepository.update.mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.perform(code, updateNewsDto)).rejects.toThrow(
        new NotFoundException(`Notícia com código ${code} não encontrada`),
      );
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(newsRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should handle partial updates with all fields', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
        description: 'Descrição atualizada',
        publicationDate: new Date('2024-01-15'),
      };

      mockNewsRepository.findOneBy
        .mockResolvedValueOnce(mockNews)
        .mockResolvedValueOnce(updatedMockNews);
      mockNewsRepository.update.mockResolvedValue(undefined);

      // Act
      await service.perform(code, updateNewsDto);

      // Assert
      expect(newsRepository.update).toHaveBeenCalledWith(mockNews.id, updateNewsDto);
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const updateNewsDto: UpdateNewsRequestDto = {
        title: 'Título atualizado',
      };

      mockNewsRepository.findOneBy.mockResolvedValueOnce(mockNews);
      const error = new Error('Database error');
      mockNewsRepository.update.mockRejectedValue(error);

      // Act & Assert
      await expect(service.perform(code, updateNewsDto)).rejects.toThrow('Database error');
    });
  });
});

