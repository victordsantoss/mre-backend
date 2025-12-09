# MRE Backend

API desenvolvida com NestJS e PostgreSQL.

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

```bash
# Rodar seed de exemplos
npm run seed:examples

# Gerar migration
npm run migration:generate -- src/database/migrations/MigrationName

# Executar migrations
npm run migration:run

# Reverter última migration
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

1. Instale as dependências:
```bash
npm install
```

2. Certifique-se de que o PostgreSQL está rodando localmente ou inicie apenas o banco via Docker:
```bash
docker-compose up database -d
```

3. Configure as variáveis de ambiente (crie um arquivo `.env` baseado em `.env.example`)

4. Execute a aplicação:
```bash
npm run start:dev
```

## 📦 Dependências Instaladas

### Principais
- `@nestjs/typeorm`: Integração do TypeORM com NestJS
- `typeorm`: ORM para TypeScript
- `pg`: Driver PostgreSQL
- `dotenv`: Gerenciamento de variáveis de ambiente
- `class-validator` e `class-transformer`: Validação e transformação de dados

## 📚 Documentação da API

Acesse a documentação Swagger em: http://localhost:3000/api
