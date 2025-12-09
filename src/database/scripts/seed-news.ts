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
        titulo: 'Lançamento de Nova Tecnologia',
        descricao:
          'Uma revolucionária tecnologia foi lançada hoje, prometendo transformar o mercado de desenvolvimento de software.',
      },
      {
        titulo: 'Evento de Programação Atrai Milhares',
        descricao:
          'O maior evento de programação do ano reuniu desenvolvedores de todo o mundo para discutir as últimas tendências.',
      },
      {
        titulo: 'Startup Brasileira Recebe Investimento',
        descricao:
          'Empresa nacional de tecnologia recebe aporte milionário para expandir suas operações.',
      },
      {
        titulo: 'Atualização de Framework Popular',
        descricao:
          'Framework mais utilizado pela comunidade recebe grande atualização com novos recursos e melhorias de performance.',
      },
      {
        titulo: 'Conferência sobre Inteligência Artificial',
        descricao:
          'Especialistas se reúnem para debater o futuro da IA e suas aplicações no desenvolvimento de software.',
      },
      {
        titulo: 'Novo Curso Online de Desenvolvimento',
        descricao:
          'Plataforma de educação lança curso completo sobre desenvolvimento full stack com as tecnologias mais modernas.',
      },
      {
        titulo: 'Hackathon Internacional Anuncia Vencedores',
        descricao:
          'Times de diversos países competiram em desafio global de programação, com projetos inovadores sendo premiados.',
      },
      {
        titulo: 'Empresa Adota Trabalho Remoto Permanente',
        descricao:
          'Grande empresa de tecnologia anuncia política de trabalho remoto permanente para todos os colaboradores.',
      },
      {
        titulo: 'Pesquisa Revela Linguagens Mais Populares',
        descricao:
          'Novo estudo aponta as linguagens de programação mais utilizadas e demandadas pelo mercado atual.',
      },
      {
        titulo: 'Lançamento de Plataforma Open Source',
        descricao:
          'Comunidade de desenvolvedores lança nova plataforma open source para facilitar o desenvolvimento colaborativo.',
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
