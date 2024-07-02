# Sistema gestão de tarefas

Este é um sistema de gerenciamento usuario que pode criar seus projetos e tarefas. 
Este sistema permitira que usuarios logados possam criar, visualizar, editar e excluir projetos e tarefas. 
Cada projeto criado pode ter x tarefas com 3 tipos de status: "concluido", "em andamento" e "pendente" sendo todas 
as tarefas ja começam como "pendente".  
Usuario tem nome, email e senha para fazer seu cadastro, e precisa do email e senha para poder logar, e fazer as demais funções disponiveis.
Projeto possui nome, descricao e ID do usuario.
As tarefas tem titulo, descricao, status e o ID do projeto que esta associada.

## Requisitos 

Este sistema precisa da instalação de algumas dependencias, então para poder usalo, instale estas:

npm install bcrypt
npm install cors 
npm install express
npm install jest
npm install jsonwebtoken
npm install mysql2
npm install nodemon
npm install sequelize

npm install supertest
npm install jest

## Como usar 

primeiramente você deve inicializar o Xampp para estar conectado com o seu banco, após isso abrir o postman deve se criar nova requisição https e colocar Raw como JSON, e no body vamos criar um usuario:

## criar User

Motodo: POST - http://localhost:8000/api/v1/user

{
    "nome":"Fulano",
    "email":"Fulano@gmail.com",
    "senha": "Fulado123"
}

## Pegar Token

Após isso deve de pegar o Token fornecido para você poder logar com o usuario:


Motodo: POST - http://localhost:8000/api/v1/login

{
    "token": "Aqui sera fornecido o Token"
}

Apos pegar o token, deve abrir a aba Headers e criar uma Key chamada Authorization e colocar o token em Value, isso o usuario estar "logado" e assim disponibilizando as funções de Usuario, Project e Task

## Listar, editar e deletar User

Agora Logados podemos listar todos os Usuario, deletar e editar qualquer usuario.

Listar Users
Motodo: GET - http://localhost:8000/api/v1/user

Pode listar um usuario especifico utilizando o id
Listar User 
Motodo: GET - http://localhost:8000/api/v1/user/id



Para o Delete, você deve fornecer o Id do usuario que você quer deletar
Deletar User
Motodo: GET - http://localhost:8000/api/v1/user/id

Para o atualizar, deve fornecer um id para saber quem vai alterar. Pode atualizar qualquer caracteristica do usuario, porem no email não pode ser igual ao de qualquer pessoa no banco, Email precisa ser unico. 
Alterar User
Motodo: GET - http://localhost:8000/api/v1/user/id

{
    "nome":"Ciclano",
    "email":"Ciclano@gmail.com",
    "senha": "Ciclano123"
}

## Listar, editar e deletar Project

Para criar projetos deve fornecer, nome, descricao, e de qual usuario é esse projeto, autorId
Criar Project
Motodo: Post - http://localhost:8000/api/v1/project

{
    "nome":"Desenvolver um software",
    "descricao":"Fazer um software para Acredicoop",
    "autorId": 1
}

Para deletar deve fornecer um id de qual projeto quer deletar
Deletar Project
Motodo: Delete - http://localhost:8000/api/v1/project/id

Listar Project
Motodo: GET - http://localhost:8000/api/v1/preject

Para listar um projeto especifico deve fornecer um Id
Listar Project
Motodo: GET - http://localhost:8000/api/v1/preject/1

Para atualizar um projeto especifico deve utilizando o id
Atualizar 
Motodo: GET - http://localhost:8000/api/v1/project/id

{
    "nome":"Software",
    "descricao":"Fazer um software para o SENAC",
    "autorId": 1
}


## Listar, editar e deletar Task

Para criar tarefas deve fornecer, titulo, descricao, e de qual projeto é esse tarefa, projectId. Ele sempre vai retornar um status "pendente" como inicial.

Criar Task
Motodo: Post - http://localhost:8000/api/v1/task

{
    "titulo":"Desenvolver um software",
    "descricao":"Fazer um software para Acredicoop",
    "projectId": 1
}

Para deletar deve fornecer um id de qual task quer deletar
Deletar Task
Motodo: Delete - http://localhost:8000/api/v1/task/id

Listar task
Motodo: GET - http://localhost:8000/api/v1/task

Para listar uma task especifica deve fornecer um Id
Listar Task
Motodo: GET - http://localhost:8000/api/v1/task/1

Para atualizar uma task especifica deve utilizando o id
Atualizar 
Motodo: PUT - http://localhost:8000/api/v1/task/id

{
    "titulo":"Fazer um carro",
    "descricao":"Fazer na maquina 3D",
    "status": "concluido",
    "projectId": 1
}


Para ver qual task esta pendente, concluido ou em andamento deve informar que vai filtrar pelo status e depois qual o tipo de status
Motodo: GET - http://localhost:8000/api/v1/task/status/concluido

"concluido" | "em_andamento" | "pendente"


vai trazer todas as tarefas com esse status.