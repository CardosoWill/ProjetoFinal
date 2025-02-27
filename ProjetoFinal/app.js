/*
# Gestão de Tarefas

Desenvolva um sistema de gerenciamento de projetos e tarefas utilizando Node.js. 
Este sistema permitirá que usuários criem, visualizem, editem e excluam projetos e tarefas. 
Cada projeto pode ter várias tarefas associadas, e cada tarefa terá um título, descrição, 
data de criação, data de conclusão e status.

## Entidades

* Usuário
    ********** ID (único)
    ********** Nome
    ********** Email
    ********** Senha (hash)
    ********** Data de criação
* Projeto
    ********** ID (único)
    ********** Nome
    ********** Descrição
    ********** Data de criação
    ********** ID do Usuário (relacionamento com a entidade Usuário)
* Tarefa
    ********** ID (único)
    ********** Título
    ********** Descrição
    ********** Data de criação
    * Data de conclusão (opcional)
    ********** Status (pendente, em andamento, concluída)
    ********** ID do Projeto (relacionamento com a entidade Projeto)
  
## Estrutura do Projeto

```
project-manager/
├── src/
│   ├── api/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── controllers/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── models/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── database.js
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```

## Requisitos

### Criação de Usuário

*********** O sistema deve permitir a criação de novos usuários com nome, email e senha.
*********** O email deve ser único para cada usuário.
*********** A senha deve ser armazenada de forma segura (hash).
  
### Autenticação

************ O sistema deve permitir que usuários façam login utilizando email e senha.
************ Deve ser gerado um token JWT para sessões autenticadas.

### Gerenciamento de Projetos

*********** Usuários autenticados podem criar novos projetos.
*********** Cada projeto deve ter um nome e descrição.
*********** Usuários podem editar e excluir seus próprios projetos.
*********** Usuários podem visualizar uma lista de seus projetos.

### Gerenciamento de Tarefas

*********** Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
*********** Cada tarefa deve ter um título, descrição e status inicial como "pendente".
*********** Usuários podem editar e excluir suas próprias tarefas.
*********** Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
*********** Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.

### Validações

*********** Todos os campos obrigatórios devem ser validados.
*********** O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
*********** O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).

### Segurança

* Implementar middleware de autenticação para proteger rotas que necessitam de usuário autenticado.
*********** Senhas devem ser armazenadas de forma segura utilizando bcrypt.

## Restrições

### Tecnologias e Ferramentas

*************** Utilizar Node.js com Express para a criação do servidor.
*************** Utilizar Sequelize para ORM e banco de dados relacional (por exemplo, PostgreSQL, MySQL).
*************** Utilizar JWT (JSON Web Token) para autenticação.
*************** Utilizar bcrypt para hashing de senhas.
*************** Seguir as melhores práticas de segurança e estruturação de código.

### Implementação

*************** O projeto deve seguir uma arquitetura MVC (Model-View-Controller) para organização do código.
*************** Deve ser implementada a separação de responsabilidades, com controladores específicos para usuários, projetos e tarefas.
*************** A conexão com o banco de dados deve ser gerenciada de forma centralizada em um arquivo de configuração.
*************** Middleware de autenticação deve ser aplicado às rotas que requerem usuário autenticado.

## Passos Adicionais


### Documentação

* Inclua um README.md detalhado com instruções de instalação, configuração e uso do sistema.
* Documente as rotas da API utilizando uma ferramenta como Swagger ou similar.
  
### Testes

* Implemente testes unitários e de integração para garantir a funcionalidade do sistema.
*/


const express = require('express')
const cors = require('cors')
const database = require('./src/config/database')
const UserApi = require('./src/api/user')
const UserRouter = require('./src/routes/user')
const ProjectRouter = require('./src/routes/project')
const TaskRouter = require('./src/routes/task')

const app = express()
app.use(express.json());

//Set use cors
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

// Rotas sem token
app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/user', UserApi.createUser)

// Rotas com token
app.use(UserApi.validateToken)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/project', ProjectRouter)
app.use('/api/v1/task', TaskRouter)

database.db.sync()
    .then(() => {
        app.listen(8000, () => {
            console.log('Server running on port 8000');
        });
    })
    .catch(err => {
        console.error(`Erro ao inicializar o banco de dados ${err}`);
    });

module.exports = app; 