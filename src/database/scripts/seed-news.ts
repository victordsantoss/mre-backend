import 'dotenv/config';
import { createDataSource } from '../data-source';
import { News } from '../entities/news.entity';

async function seedNews() {
  try {
    const dataSource = createDataSource();
    await dataSource.initialize();
    const newsRepository = dataSource.getRepository(News);
    await newsRepository.clear();

    const news = newsRepository.create([
      {
        title: 'Lançamento de Nova Tecnologia',
        description:
          'Uma revolucionária tecnologia foi lançada hoje, prometendo transformar o mercado de desenvolvimento de software.',
        publicationDate: new Date('2024-01-15T10:00:00Z'),
      },
      {
        title: 'Evento de Programação Atrai Milhares',
        description:
          'O maior evento de programação do ano reuniu desenvolvedores de todo o mundo para discutir as últimas tendências.',
        publicationDate: new Date('2024-02-20T14:30:00Z'),
      },
      {
        title: 'Startup Brasileira Recebe Investimento',
        description:
          'Empresa nacional de tecnologia recebe aporte milionário para expandir suas operações.',
        publicationDate: new Date('2024-03-10T09:15:00Z'),
      },
      {
        title: 'Atualização de Framework Popular',
        description:
          'Framework mais utilizado pela comunidade recebe grande atualização com novos recursos e melhorias de performance.',
        publicationDate: new Date('2024-04-05T16:45:00Z'),
      },
      {
        title: 'Conferência sobre Inteligência Artificial',
        description:
          'Especialistas se reúnem para debater o futuro da IA e suas aplicações no desenvolvimento de software.',
        publicationDate: new Date('2024-05-18T11:00:00Z'),
      },
      {
        title: 'Novo Curso Online de Desenvolvimento',
        description:
          'Plataforma de educação lança curso completo sobre desenvolvimento full stack com as tecnologias mais modernas.',
        publicationDate: new Date('2024-06-22T08:30:00Z'),
      },
      {
        title: 'Hackathon Internacional Anuncia Vencedores',
        description:
          'Times de diversos países competiram em desafio global de programação, com projetos inovadores sendo premiados.',
        publicationDate: new Date('2024-07-30T19:00:00Z'),
      },
      {
        title: 'Empresa Adota Trabalho Remoto Permanente',
        description:
          'Grande empresa de tecnologia anuncia política de trabalho remoto permanente para todos os colaboradores.',
        publicationDate: new Date('2024-08-12T13:20:00Z'),
      },
      {
        title: 'Pesquisa Revela Linguagens Mais Populares',
        description:
          'Novo estudo aponta as linguagens de programação mais utilizadas e demandadas pelo mercado atual.',
        publicationDate: new Date('2024-09-25T15:40:00Z'),
      },
      {
        title: 'Lançamento de Plataforma Open Source',
        description:
          'Comunidade de desenvolvedores lança nova plataforma open source para facilitar o desenvolvimento colaborativo.',
        publicationDate: new Date('2024-10-08T12:10:00Z'),
      },
    ]);

    await newsRepository.save(news);
    console.log(`Criadas ${news.length} notícias`);
    await dataSource.destroy();
  } catch (error) {
    console.error('Erro ao popular notícias:', error);
    process.exit(1);
  }
}

seedNews();
