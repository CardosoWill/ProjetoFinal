const project = require('../model/project')
const UserController = require('./user')

class projectController {

    async createProject(nome, descricao, autorId) {
        if (nome === undefined || descricao === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(Number(autorId))

        const projectValue = await project.create({
            nome,
            descricao,
            autorId
        })

        return projectValue
    }

    async findProject(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await project.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Projeto não encontrada.')
        }

        return projectValue
    }

    async update(id, nome, descricao, autorId) {
        if (id === undefined || nome === undefined || descricao === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(autorId)

        const projectValue = await this.findProject(id)

        projectValue.nome = nome
        projectValue.descricao = descricao
        projectValue.autorId = autorId
        projectValue.save()

        return projectValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const projectValue = await this.findProject(id)
        projectValue.destroy()

        return
    }

    async find(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await project.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Projeto não encontrada.')
        }

        return projectValue
}

    async findAll() {
        
        const projectValue = await project.findAll()
        return projectValue
    }

} 

module.exports = new projectController()