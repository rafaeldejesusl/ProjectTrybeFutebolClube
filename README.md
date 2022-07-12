# Trybe Futebol Clube

Esse repositório contém uma aplicação desenvolvida para o projeto Trybe Futebol Clube na Trybe. É formado por um banco de dados MySQL, um back end desenvolvido em TypeScript com Express e manipulando o banco através da ORM Sequelize e um front end desenvolvido em React.

---

## Tecnologias

* Docker

* React

* MySQL

* Node.js

* Express

* TypeScript

* Sequelize

* Mocha

* Chai

* jsonwebtoken

* bcryptjs

---

## Instalação

Inicialmente, abra o terminal e cole o seguinte código para clonar o repositório em sua máquina:

```
git clone git@github.com:rafaeldejesusl/ProjectTrybeFutebolClube.git
```

Após clonado, entre na pasta do projeto:

```
cd ProjectTrybeFutebolClube
```

Na pasta raiz do projeto, instale as dependências

```
npm install
```

Execute o comando a seguir para inicializar os contâineres da aplicação

```
npm run compose:up
```

Após isso, a aplicação pode ser aberta no navegador através do seguinte endereço:

```
http://localhost:3000/
```

**⚠ OBS: O processo de iniciação pode ser demorado, espere até sua conclusão para evitar erros.**

---

## Banco de Dados

O banco de dados roda num contâiner MySQL, e a interação com o backend é realizada através da ORM Sequelize. O nome do banco é TRYBE_FUTEBOL_CLUBE, e contém três tabelas:

* "teams" que contém as informações dos times registrados;

* "matches" que contém as informações dos jogos registrados;

* "users" que contém as informações dos usuários registrados.

---

## Back End

O back end roda num contâiner criado a partir do Dockerfile na pasta "backend", e realiza as operações das tabelas do banco de dados através do Sequelize. As rotas disponíveis são:

* Método POST `/login`, verifica o usuário e retorna o token;

* Método GET `/login/validate`, valida o usuário retornando sua permissão (user ou admin);

* Método GET `/teams`, retorna todos os times no banco de dados;

* Método GET `/teams/:id`, retorna o time pelo id no banco de dados;

* Método GET `/matches`, retorna os jogos no banco de dados, dependendo da query inProgress ser true para jogos em andamento ou falso para jogos finalizados;

* Método POST `/matches`, cria uma nova partida no banco de dados;

* Método PATCH `/matches/:id/finish`, finaliza uma partida em andamento;

* Método PATCH `/matches/:id`, atualiza o placar de uma partida;

* Método GET `/leaderboard/home`, retorna a classificação dos times quando foram mandantes;

* Método GET `/leaderboard/away`, retorna a classificação dos times quando foram visitantes;

* Método GET `/leaderboard`, retorna a classificação geral dos times;

---

## Front End

O front end roda num contâiner criado a partir do Dockerfile na pasta "frontend". O código e a estilização do frontend foi disponibilizado pela Trybe, sendo apenas necessário desenvolver o backend.

---

## Testes

Os testes de integração do backend têm cobertura de pouco mais de 90%. Os testes de back foram realizados com Mocha e Chai;

---

## Feedbacks

Caso tenha alguma sugestão ou tenha encontrado algum erro no código, estou disponível para contato no meu [LinkedIn](https://www.linkedin.com/in/rafael-de-jesus-lima/)
