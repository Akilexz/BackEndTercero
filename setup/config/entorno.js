let initVar = () => {
    process.env.CLAVE_JWT = process.env.CLAVE_JWT || 'clave de desarrollo / cambiar en producción'
    process.env.PORT = process.env.PORT || 3001
    process.env.OPCIONES_JWT = process.env.OPCIONES_JWT || JSON.stringify({ expiresIn: 60 * 20, algorithm: 'HS256', jwtid: '5', keyid: '5' })
    process.env.CLIENT = 'pg'
    process.env.CONNECTION_DB = {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'j-0980161816',
        database: 'proyecto_tercero'
    }
}

module.exports = {
    initVar
}