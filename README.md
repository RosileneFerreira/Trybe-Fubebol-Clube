O Projeto Trybe Futebol Clube (TFC) é uma aplicação fullstack que oferece informações sobre jogos e classificações de futebol.
Desenvolvi esse projeto durante meu curso de Desenvolvimento Web na Trybe.
O objetivo do projeto é de consolidar os estudos de TypeScrypt, programação orientada a objetos (POO) e SOLID. A API foi desenvolvida com NodeJs e utiliza a arquitetura MSC: Model, Service e Controller.
Os testes da aplicação utiliza as bibliotecas Sinon, Mocha e Chai.
Desenvolvi o back-end dockerizado utilizando modelagem de dados através do Sequelize, de forma que o front-end pudesse consumir os dados da API adequadamente. A arquitetura segue o modelo MSC e foram aplicados os princípios e conceitos de POO e SOLID.
Nesse projeto todo o front-end foi desenvolvido pela Trybe.

## Técnologias utilizadas
Desenvolvido com: TypeScript, NodeJs, Express
Banco de dados: Sequelize com mysql2,
Testes: Sinon, Mocha, Chai


## Instalação
Requisitos:

docker compose versão 1.29.2 ou mais recente.
node versão 16.14.0 ou mais recente.
O repositório conta com um arquivo docker-compose já configurado para maior comodidade e replicabilidade.

## Siga os passos a seguir para ter a aplicação rodando em sua máquina:

## Clonando o repositório
  git clone git@github.com:RosileneFerreira/Trybe-Futebol-Clube.git

## Instalando as dependências
  cd trybe-futebol-clube
  npm run postinstall

## Subindo os containers e inicializando os serviços Em um novo terminal execute:
  npm run compose:up:dev

## Criando e populando o banco de dados
  docker exec -it app_backend bash
  npm run db:reset

Pronto! O frontend está rodando localmente na porta 3000 e o backend na porta 3001
Você pode configurar as variáveis de ambiente conforme o arquivo .env.exemple se desejar utilizar outras credenciais, portas etc.

Esse é um README provisório. Será adicionado mais informações em breve.
