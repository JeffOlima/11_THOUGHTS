const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Thoughts','sqluser','password',{
    honst:'localhost',
    dialect:'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (err) {
    console.log(`Nao foi possivel conectar ${err}`)
}

module.exports = sequelize