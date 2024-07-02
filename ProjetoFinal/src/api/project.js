const ProjectController = require('../controller/project')

class ProjectApi {
    
    async createProject(req, res) {
        const { nome, descricao, autorId } = req.body

        try {
            const project = await ProjectController.createProject(nome, descricao, autorId)
            return res.status(201).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar postagem ${e.message}`})
        }
    }

    async updateProject(req, res) {
        const { id } = req.params
        const { nome, descricao, autorId } = req.body

        try {
            const project = await ProjectController.update(Number(id), nome, descricao, autorId)
            return res.status(200).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar postagem ${e.message}`})
        }
    }

    async deleteProject(req, res) {
        const { id } = req.params

        try {
            await ProjectController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar postagem ${e.message}`})
        }
    }

    async findProjects(req, res) {
        const { id } = req.params
        try {
            const projects = await ProjectController.find(id)
            return res.status(200).send(projects)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar postagens ${e.message}`})
        }
    }

    async findProjectsAll(req, res) {
        try {
            const projects = await ProjectController.findAll()
            return res.status(200).send(projects)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar postagens ${e.message}`})
        }
    }
}

module.exports = new ProjectApi()