import { Sequelize } from "sequelize"

// Conexão com Banco de Dados MySQL
const sequelize = new Sequelize('postapp', 'root', '0315@Dnz', {
    host: "localhost",
    dialect: "mysql"
})

// Exportação
export default {Sequelize: Sequelize, sequelize: sequelize}