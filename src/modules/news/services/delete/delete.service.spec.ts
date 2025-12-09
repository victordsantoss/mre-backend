import { Test, TestingModule } from '@nestjs/testing';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteNewsService } from './delete.service';
import type { INewsRepository } from '../../repository/news.interface';
import { News } from 'src/database/entities';

describe('DeleteNewsService', () => {
  let service: DeleteNewsService;
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

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteNewsService,
        {
          provide: 'INewsRepository',
          useValue: mockNewsRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteNewsService>(DeleteNewsService);
    newsRepository = module.get('INewsRepository');

    // Mock Logger to avoid console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('perform', () => {
    it('should delete a news successfully', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';

      mockNewsRepository.findOneBy.mockResolvedValue(mockNews);
      mockNewsRepository.softDelete.mockResolvedValue(undefined);

      // Act
      await service.perform(code);

      // Assert
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(newsRepository.findOneBy).toHaveBeenCalledWith('code', code);
      expect(newsRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(newsRepository.softDelete).toHaveBeenCalledWith(mockNews.id);
    });

    it('should throw NotFoundException when news is not found', async () => {
      // Arrange
      const code = 'non-existent-code';

      mockNewsRepository.findOneBy.mockResolvedValue(null);

      // Act & Assert
      await expect(service.perform(code)).rejects.toThrow(
        new NotFoundException(`Notícia com código ${code} não encontrada`),
      );
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(newsRepository.softDelete).not.toHaveBeenCalled();
    });

    it('should log the deletion message', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';

      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockNewsRepository.findOneBy.mockResolvedValue(mockNews);
      mockNewsRepository.softDelete.mockResolvedValue(undefined);

      // Act
      await service.perform(code);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(`Deletando notícia com código: ${code}`);
    });

    it('should propagate repository errors from findOneBy', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const error = new Error('Database error');

      mockNewsRepository.findOneBy.mockRejectedValue(error);

      // Act & Assert
      await expect(service.perform(code)).rejects.toThrow('Database error');
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(newsRepository.softDelete).not.toHaveBeenCalled();
    });

    it('should propagate repository errors from softDelete', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const error = new Error('Database error during delete');

      mockNewsRepository.findOneBy.mockResolvedValue(mockNews);
      mockNewsRepository.softDelete.mockRejectedValue(error);

      // Act & Assert
      await expect(service.perform(code)).rejects.toThrow('Database error during delete');
      expect(newsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(newsRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should handle deletion with different news IDs', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';
      const newsWithDifferentId = { ...mockNews, id: 999 };

      mockNewsRepository.findOneBy.mockResolvedValue(newsWithDifferentId);
      mockNewsRepository.softDelete.mockResolvedValue(undefined);

      // Act
      await service.perform(code);

      // Assert
      expect(newsRepository.softDelete).toHaveBeenCalledWith(999);
    });

    it('should perform soft delete, not hard delete', async () => {
      // Arrange
      const code = '550e8400-e29b-41d4-a716-446655440000';

      mockNewsRepository.findOneBy.mockResolvedValue(mockNews);
      mockNewsRepository.softDelete.mockResolvedValue(undefined);

      // Act
      await service.perform(code);

      // Assert
      expect(newsRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(newsRepository.softDelete).toHaveBeenCalledWith(mockNews.id);
    });
  });
});

