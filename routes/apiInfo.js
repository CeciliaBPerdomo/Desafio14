const Router = require('express')
const { append } = require('express/lib/response')
const args = require('../src/yargs')
const compression = require('compression')
const logger = require('../logger.js')
const cluster = require('cluster')
const os = require('os')

const apiInfo = Router()

const MODO_CLUSTER = process.argv[2] == 'CLUSTER'

if (MODO_CLUSTER && cluster.isMaster){
    const numCPUS = os.cpus().length

    console.log(`Número de procesadores: ${numCPUS}`)
    console.log(`PID Master: ${process.pid}`)

    for (let i=0; i < numCPUS; i++){
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker: ', worker.process.pid, 'died: ', new Date().toLocaleString())
        cluster.fork()
    })
} else {
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
}

module.exports = apiInfo