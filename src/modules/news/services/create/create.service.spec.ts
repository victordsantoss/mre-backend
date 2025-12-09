import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { CreateNewsService } from './create.service';
import type { INewsRepository } from '../../repository/news.interface';
import { CreateNewsRequestDto } from '../../dtos/create.dto';
import { News } from 'src/database/entities';

describe('CreateNewsService', () => {
  let service: CreateNewsService;
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
        CreateNewsService,
        {
          provide: 'INewsRepository',
          useValue: mockNewsRepository,
        },
      ],
    }).compile();

    service = module.get<CreateNewsService>(CreateNewsService);
    newsRepository = module.get('INewsRepository');

    // Mock Logger to avoid console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('perform', () => {
    it('should create a news successfully', async () => {
      // Arrange
      const createNewsDto: CreateNewsRequestDto = {
        title: 'Título da notícia',
        description: 'Descrição da notícia',
        publicationDate: new Date('2024-01-01'),
      };

      mockNewsRepository.create.mockResolvedValue(mockNews);

      // Act
      const result = await service.perform(createNewsDto);

      // Assert
      expect(newsRepository.create).toHaveBeenCalledTimes(1);
      expect(newsRepository.create).toHaveBeenCalledWith({
        title: createNewsDto.title,
        description: createNewsDto.description,
        publicationDate: createNewsDto.publicationDate,
      });
      expect(mockNews.toDto).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        code: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Título da notícia',
        description: 'Descrição da notícia',
        publicationDate: new Date('2024-01-01'),
        creationDate: new Date('2024-01-01'),
        updateDate: new Date('2024-01-01'),
      });
    });

    it('should log the creation message', async () => {
      // Arrange
      const createNewsDto: CreateNewsRequestDto = {
        title: 'Título da notícia',
        description: 'Descrição da notícia',
        publicationDate: new Date('2024-01-01'),
      };

      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockNewsRepository.create.mockResolvedValue(mockNews);

      // Act
      await service.perform(createNewsDto);

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Criando nova notícia');
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const createNewsDto: CreateNewsRequestDto = {
        title: 'Título da notícia',
        description: 'Descrição da notícia',
        publicationDate: new Date('2024-01-01'),
      };

      const error = new Error('Database error');
      mockNewsRepository.create.mockRejectedValue(error);

      // Act & Assert
      await expect(service.perform(createNewsDto)).rejects.toThrow('Database error');
      expect(newsRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should handle special characters in title and description', async () => {
      // Arrange
      const createNewsDto: CreateNewsRequestDto = {
        title: 'Título com "aspas" e \'apostrofo\'',
        description: 'Descrição com <html> & símbolos especiais!',
        publicationDate: new Date('2024-01-01'),
      };

      const specialCharNews = {
        ...mockNews,
        title: createNewsDto.title,
        description: createNewsDto.description,
      };
      mockNewsRepository.create.mockResolvedValue(specialCharNews);

      // Act
      await service.perform(createNewsDto);

      // Assert
      expect(newsRepository.create).toHaveBeenCalledWith({
        title: 'Título com "aspas" e \'apostrofo\'',
        description: 'Descrição com <html> & símbolos especiais!',
        publicationDate: createNewsDto.publicationDate,
      });
    });
  });
});

