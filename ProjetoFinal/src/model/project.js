const database = require('../config/database')

class Project {
    constructor() {

        this.model = database.db.define('projects', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: [0, 100]
                }
            },
            descricao: {
                type: database.db.Sequelize.STRING
            },
            autorId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        
        })
    }
}

module.exports = (new Project()).model