# Desafio14
Desafío: Loggers, gzip y análisis de performance

a) 
Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un 
caso y otro.

http://localhost:8080/Info -- 474 B / 711 B transferido, load: 79 ms
http://localhost:8080/Infozip -- 474 B / 734 B transferido, load: 66 ms

b)
Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
    ● Ruta y método de todas las peticiones recibidas por el servidor (info)
    ● Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
    ● Errores lanzados por las apis de mensajes y productos, únicamente (error)
Considerar el siguiente criterio:
    ● Loggear todos los niveles a consola (info, warning y error)
    ● Registrar sólo los logs de warning a un archivo llamada warn.log
    ● Enviar sólo los logs de error a un archivo llamada error.log