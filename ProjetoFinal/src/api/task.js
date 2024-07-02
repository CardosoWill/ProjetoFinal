const TaskController = require('../controller/task')

class TaskApi {
    
    async createTask(req, res) {
        const { titulo, descricao, status, projectId } = req.body

        try {
            const task = await TaskController.createTask(titulo, descricao, status, projectId)
            return res.status(201).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar tarefa! Motivo: ${e.message}`})
        }
    }

    async updateTask(req, res) {
        const { id } = req.params
        const { titulo, descricao, status, projectId } = req.body

        try {
            const task = await TaskController.update(Number(id), titulo, descricao, status, projectId)
            return res.status(200).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar tarefa! Motivo: ${e.message}`})
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params

        try {
            await TaskController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar tarefa! Motivo: ${e.message}`})
        }
    }

    async findTasks(req, res) {
        const { id } = req.params
        try {
            const tasks = await TaskController.find(id)
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro aao listar tarefa! Motivo: ${e.message}`})
        }
    }

    async findTasksAll(req, res) {
        try {
            const tasks = await TaskController.findAll()
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tarefas! Motivo: ${e.message}`})
        }
    }

    async findTasksStatus(req, res) {
        const { status } = req.params;

        try {
            const tasks = await TaskController.findAllStatus(status);
            return res.status(200).send(tasks);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar tarefas! ${e.message}` });
        }
    }

}

module.exports = new TaskApi()