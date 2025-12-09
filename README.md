# MRE Backend

API desenvolvida com NestJS e PostgreSQL seguindo princípios SOLID e arquitetura modular.

## 📋 Requisitos

- **Node.js**: 22.x
- **Docker** e **Docker Compose** (para execução com containers)
- **PostgreSQL**: 16 (gerenciado pelo Docker)

## 🏗️ Arquitetura de Pastas

```
src/
├── common/                      # Módulos compartilhados
│   ├── configs/                # Configurações globais (CORS, Swagger)
│   ├── dtos/                   # DTOs base (paginação)
│   ├── enums/                  # Enumeradores globais
│   ├── filters/                # Filtros de exceção
│   ├── repositories/           # Repositórios base (interfaces e implementações)
│   └── utils/                  # Utilitários compartilhados
│
├── database/                    # Configuração do banco de dados
│   ├── entities/               # Entidades TypeORM
│   ├── scripts/                # Scripts de seed e migrations
│   └── data-source.ts          # Configuração do DataSource
│
├── integrations/                # Integrações externas
│   └── via-cep/                # Integração com API ViaCEP
│       ├── dtos/               # DTOs específicos
│       ├── services/           # Serviços da integração
│       └── types/              # Tipos e interfaces
│
├── modules/                     # Módulos de domínio
│   ├── address/                # Módulo de endereços
│   │   ├── controllers/        # Controladores REST
│   │   ├── services/           # Lógica de negócio
│   │   └── dtos/               # DTOs do módulo
│   │
│   └── news/                   # Módulo de notícias
│       ├── controllers/        # Controladores REST
│       ├── services/           # Serviços (CRUD, List, etc)
│       ├── repository/         # Repositório específico
│       ├── dtos/               # DTOs do módulo
│       └── providers/          # Providers do NestJS
│
└── main.ts                      # Ponto de entrada da aplicação
```

### Princípios de Arquitetura

- **Modularização**: Cada funcionalidade é isolada em seu próprio módulo
- **Separação de Responsabilidades**: Controllers, Services, Repositories e DTOs bem definidos
- **SOLID**: 
  - **Interface Segregation**: Interfaces específicas como `IBaseRepository`
  - **Dependency Inversion**: Serviços dependem de abstrações (interfaces) não de implementações concretas
  - **Single Responsibility**: Cada classe tem uma única responsabilidade bem definida
- **Repository Pattern**: Abstração da camada de dados através de interfaces
- **DTO Pattern**: Validação e transformação de dados com `class-validator` e `class-transformer`

## 🛠️ Tecnologias

### Core
- **NestJS**: Framework Node.js para aplicações server-side escaláveis
- **TypeScript**: Superset do JavaScript com tipagem estática
- **TypeORM**: ORM para TypeScript e JavaScript
- **PostgreSQL**: Banco de dados relacional

### Validação e Transformação
- **class-validator**: Validação de dados declarativa
- **class-transformer**: Transformação de objetos

### Documentação
- **Swagger**: Documentação automática da API

### Testes
- **Jest**: Framework de testes unitários e de integração
- **Supertest**: Testes de requisições HTTP

### Qualidade de Código
- **ESLint**: Linter para identificar problemas no código
- **Prettier**: Formatação consistente de código

## 🚀 Como executar com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Executar a aplicação

1. Clone o repositório e acesse a pasta:
```bash
cd mre-backend
```

2. Inicie os containers:
```bash
docker-compose up -d
```

A API estará disponível em: http://localhost:3000
O banco de dados PostgreSQL estará disponível em: localhost:5432

3. **(Opcional) Popule o banco com dados de exemplo:**
```bash
# Executar seed dentro do container
docker exec -it nest_api_mre npm run seed:news
```

### Comandos úteis

```bash
# Iniciar os containers
docker-compose up -d

# Ver logs da API
docker-compose logs -f api

# Ver logs do banco de dados
docker-compose logs -f database

# Parar os containers
docker-compose down

# Parar e remover volumes (limpa o banco de dados)
docker-compose down -v

# Reconstruir as imagens
docker-compose up --build

# Acessar o container da API
docker exec -it nest_api_mre sh

# Acessar o PostgreSQL
docker exec -it postgres_db_mre psql -U mre_user -d mre_database
```

## 🗄️ Configuração do Banco de Dados

As credenciais padrão do banco de dados são:
- **Host**: database (dentro do Docker) ou localhost (fora do Docker)
- **Porta**: 5432
- **Usuário**: mre_user
- **Senha**: mre_password
- **Database**: mre_database

### Scripts de Banco de Dados

#### Seeds (Popular banco com dados de exemplo)

```bash
# Seed de notícias (popula a tabela news com dados de exemplo)
npm run seed:news
```

Os seeds são úteis para:
- Desenvolvimento local com dados de teste
- Demonstração da aplicação
- Testes de integração

#### Migrations

```bash
# Gerar uma nova migration baseada nas mudanças das entidades
npm run migration:generate -- src/database/migrations/MigrationName

# Executar todas as migrations pendentes
npm run migration:run

# Reverter a última migration executada
npm run migration:revert
```

## 📝 Variáveis de Ambiente

As variáveis de ambiente são configuradas no `docker-compose.yml`:
- `DATABASE_HOST`: Host do banco de dados
- `DATABASE_PORT`: Porta do banco de dados
- `DATABASE_USERNAME`: Usuário do banco de dados
- `DATABASE_PASSWORD`: Senha do banco de dados
- `DATABASE_NAME`: Nome do banco de dados
- `JWT_SECRET`: Chave secreta para JWT
- `PORT`: Porta da aplicação
- `NODE_ENV`: Ambiente de execução

## 🛠️ Desenvolvimento Local (sem Docker)

### Pré-requisitos
- Node.js 22.x instalado
- PostgreSQL rodando localmente ou via Docker

### Passos

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure o banco de dados:**

   Opção 1 - Inicie apenas o PostgreSQL via Docker:
   ```bash
   docker-compose up database -d
   ```

   Opção 2 - Use um PostgreSQL local e configure as credenciais

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=mre_user
   DATABASE_PASSWORD=mre_password
   DATABASE_NAME=mre_database
   PORT=3000
   NODE_ENV=development
   ```

4. **Execute as migrations (se houver):**
```bash
npm run migration:run
```

5. **Popule o banco com dados de exemplo (seeds):**
```bash
npm run seed:news
```

6. **Inicie a aplicação em modo de desenvolvimento:**
```bash
npm run start:dev
```

A API estará disponível em: http://localhost:3000
Documentação Swagger: http://localhost:3000/api

### Outros comandos úteis

```bash
# Modo de produção
npm run start:prod

# Modo debug
npm run start:debug

# Executar testes
npm run test

# Executar testes com coverage
npm run test:cov

# Executar testes em modo watch
npm run test:watch

# Formatar código
npm run format

# Executar linter
npm run lint
```

## 📦 Dependências Instaladas

### Principais
- `@nestjs/typeorm`: Integração do TypeORM com NestJS
- `typeorm`: ORM para TypeScript
- `pg`: Driver PostgreSQL
- `dotenv`: Gerenciamento de variáveis de ambiente
- `class-validator` e `class-transformer`: Validação e transformação de dados

## 🎯 Princípios SOLID e Uso de Interfaces

Este projeto segue os princípios SOLID para garantir código limpo, manutenível e escalável:

### Interface Segregation Principle (ISP)

As interfaces são criadas de forma específica e segregada para cada necessidade:

**Exemplo: `IBaseRepository<Entity>`**
```typescript
// src/common/repositories/base.repository.interface.ts
export interface IBaseRepository<Entity, CreateInput, UpdateInput> {
  findAll(): Promise<Entity[]>
  findById(id: number): Promise<Entity | null>
  create(data: CreateInput): Promise<Entity>
  update(id: number, data: UpdateInput): Promise<UpdateResult>
  delete(id: number): Promise<void>
  softDelete(id: number): Promise<void>
  findOneBy<K extends keyof Entity>(field: K, value: Entity[K]): Promise<Entity | null>
  findByFilters(filters: BasePaginationRequestDto): Promise<PaginatedResult<Entity>>
}
```

### Dependency Inversion Principle (DIP)

Os módulos de alto nível não dependem de módulos de baixo nível, ambos dependem de abstrações (interfaces):

- **Services** dependem de **interfaces de repositórios**, não de implementações concretas
- Facilita testes unitários (mocking de dependências)
- Permite trocar implementações sem afetar o código dependente

**Exemplo de uso:**
```typescript
// O serviço depende da interface, não da implementação
constructor(
  @Inject('NEWS_REPOSITORY')
  private readonly newsRepository: IBaseRepository<News>
) {}
```

### Single Responsibility Principle (SRP)

Cada classe tem uma única responsabilidade:
- **Controllers**: Receber requisições HTTP e retornar respostas
- **Services**: Lógica de negócio
- **Repositories**: Acesso a dados
- **DTOs**: Validação e transformação de dados
- **Entities**: Representação de tabelas do banco

### Benefícios da Arquitetura

✅ **Testabilidade**: Interfaces facilitam a criação de mocks e testes unitários  
✅ **Manutenibilidade**: Código organizado e fácil de entender  
✅ **Escalabilidade**: Fácil adicionar novos módulos e funcionalidades  
✅ **Reutilização**: Código compartilhado através de interfaces e classes base  
✅ **Flexibilidade**: Fácil trocar implementações sem quebrar código existente

## 📚 Documentação da API

Acesse a documentação Swagger em: http://localhost:3000/api

### Principais Endpoints

- `GET /api` - Documentação Swagger
- `GET /news` - Listar notícias com paginação
- `GET /news/:id` - Buscar notícia por ID
- `POST /news` - Criar nova notícia
- `PATCH /news/:id` - Atualizar notícia
- `DELETE /news/:id` - Deletar notícia
- `GET /address/:cep` - Buscar endereço por CEP (integração ViaCEP)
