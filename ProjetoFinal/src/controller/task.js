const task = require('../model/task')
const ProjectController = require('./project')

class taskController {
    
    async createTask(titulo, descricao, status, projectId) {
        if (titulo === undefined || descricao === undefined || projectId === undefined) {
            throw new Error('Título, descricao, status e Id de projeto são obrigatórios.')
        }   
        
        if (status !== "pendente") {
            status = 'pendente';
        }
                
        await ProjectController.findProject(Number (projectId))
         
        const taskValue = await task.create({
            titulo, 
            descricao, 
            status, 
            projectId
        })

        return taskValue
    }

    async findTask(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const taskValue = await task.findByPk(id)
        
        if (!taskValue) {
            throw new Error('Tarefa não encontrada.')
        }

        return taskValue
    }

    async update(id, titulo, descricao, status, projectId) {
        if (id === undefined || titulo === undefined || descricao === undefined || status === undefined || projectId === undefined) {
            throw new Error('Título, descrição, status e Id do projeto são obrigatórios!')
        }

        if (status !== "concluido" && status !== "em_andamento" && status !== "pendente") {
            throw new Error(`Nomenclatura ${status} Escolha entre /concluido | /em_andamento | /pendente`);
        }
    
        await ProjectController.findProject (projectId)

        const taskValue = await this.findTask(id)

        taskValue.titulo = titulo
        taskValue.descricao = descricao
        taskValue.status = status
        taskValue.projectId = projectId
        taskValue.save()
;
        return taskValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const taskValue = await this.findTask(id)
        taskValue.destroy()

        return
    }

    async find(id) {
        if (id === undefined) { 
            throw new Error('Id é obrigatório.')
        }

        const taskValue = await task.findByPk(id)
        if (!taskValue) {
            throw new Error('Projeto não encontrada.')
        }

        return taskValue
    }

    async findAll() {
        return task.findAll()
    }

    async findAllStatus(status) {
        const tasks = await task.findAll({ where: { status } });

        if (tasks === undefined || tasks.length === 0) {
            throw new Error(`Nomenclatura "${status}" Errada! Escolha entre /concluido | /em_andamento | /pendente`);
        }

        return tasks;
    }

} 

module.exports = new taskController()