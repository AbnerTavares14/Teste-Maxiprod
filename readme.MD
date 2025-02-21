## Teste para uma vaga da Maxiprod

## Como rodar o projeto:

### Para rodar usando docker, basta utiliza o comando:

```bash
docker compose up
```

### Por algum motivo, quando sobe o docker compose, ao acessar o front end pela primeira vez, a página fica sem a formatação do CSS, mas é só atualizar a página que ela fica normal.

### Caso tenha algum problema com o docker e tenha que rodar sem ele:

```bash
cd backend
```

### Depois use o seguinte comando para baixar as dependências do projeto:

```bash
npm i
```

### Depois use o seguinte comando para rodar a aplicação em modo desenvolvedor:

```bash
npm run dev
```

### Depois de fazer isso, o backend estará funcionando e pronto para receber requisições.

### Para rodar o frontend, se você estiver na pasta raiz rode:

```bash
cd frontend
npm run i
npm run dev
```

### Caso esteja no diretório do backend, rode:

```bash
cd ..
cd frontend
npm run i
npm run dev
```

## Documentação Swagger

### A documentação Swagger do backend pode ser encontrada acessando localhost:5000/api-docs
