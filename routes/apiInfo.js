const Router = require('express')
const { append } = require('express/lib/response')
const args = require('../src/yargs')
const compression = require('compression')
const logger = require('../logger.js')

const apiInfo = Router()

apiInfo.get('/info', (req, res) => {
    res.json({
        "Argumentos de entrada": {
            "Puerto": args.port
        },
        "Nombre de la plataforma (Sistema operativo)": process.platform, 
        "Versión de Node.js": process.version, 
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecución": process.argv[1],
        "Process id": process.pid,
        "Carpeta del proyecto": process.cwd()
    })
})

apiInfo.get('/infozip', compression(), (req, res) => {
    res.json({
        "Argumentos de entrada": {
            "Puerto": args.port
        },
        "Nombre de la plataforma (Sistema operativo)": process.platform, 
        "Versión de Node.js": process.version, 
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecución": process.argv[1],
        "Process id": process.pid,
        "Carpeta del proyecto": process.cwd()
    })
})

apiInfo.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`La ruta ${method} ${url} no está implementada`) 
    res.send(`La ruta ${method} ${url} no está implementada`)
})

module.exports = apiInfo