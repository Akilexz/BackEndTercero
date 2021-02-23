;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let getDatos = (req, res) => {
    let tabla = req.query.tabla
    let campos = req.query.campos
    db.select(campos).from(tabla)
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            sms: `Error del servidor ${error}`
        })
    })
}

let postDatos = (req, res) => {
    let tabla = req.body.tabla
    let datos = req.body.datos
    db(tabla).returning('id').insert(datos)
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
}

let updateDatos = (req, res) => {
    console.log(req.body);
    let tabla = req.body.tabla;
    let datoId = req.body.datoId;
    // console.log(datoId);
    // console.log(tabla);
    datoId.forEach(element => {
        db(tabla).where('id', element.id).update(element)
            .then(resultado => {
                return res.status(200).json({
                    ok: true,
                    data: resultado,
                    mensaje: `se actualizo el registro`
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    data: null,
                    mensaje: `error ${error}`
                })
            })
    })
}
let deleteDatos = (req, res) => {
    let tabla = req.body.tabla
    let dataId = req.body.datoId
    db(tabla).where('id', dataId).delete()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            sms: `Error en el servidor ${error}`
        })
    })
}
let getDatosbyID = (req, res) => {
    let tabla = req.query.tabla
    let campo = req.query.campo
    let id = req.query.id
    db.select(campo).from(tabla).where('id', id)
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
}
let getClientes = (req, res) => {
    db.raw('select * from clientes order by id desc limit 1')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado.rows
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
}
let getJOin = (req, res) => {
    db.raw('select clientes.id,clientes.nombre,clientes.apellido,clientes.identificacion,clientes.email,clientes.idgestion,gestion.titulo,gestion.fecha,gestion.hora from gestion inner join clientes on gestion.id=clientes.idgestion order by fecha desc')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado.rows
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: true,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
}

// let login = (req, res) => {
//     // const newLocal = 'select * from clientes where clientes.identificacion=?1 '
//     let tabla = req.body.tabla
//     let datos = req.body.datos
//         // console.log(tabla)
//     console.log(datos)

//     // db.raw(`select clientes from clientes where identificacion=? ${datos}`)
//     db.select(tabla).from(tabla).where(datos)
//         // console.log(db.raw)
//         // db.raw(newLocal)
//         .then(resultado => {
//             return res.status(200).json({
//                 ok: true,
//                 datos: resultado
//             })
//         })
//         .catch((error) => {
//             return res.status(500).json({
//                 ok: true,
//                 datos: null,
//                 mensaje: `Error del servidor: ${error}`
//             })
//         })
//     if (data = datos) {
//         console.log("identificacion aceptada")
//     } else {
//         console.log("identificacion no valida")
//     }
// }
let logueo = (req, res) => {
    let user = req.body.user;
    let password = req.body.password;
    db.raw(`select * from login where correo = '${user}'`)
        .then(resultado => {
            // console.log(resultado.rows[0].correo);
            if (resultado.rows[0].contrasena == password && resultado.rows[0].correo == user) {
                return res.status(200).json({
                    ok: true,
                    datos: resultado.rows,
                    mensaje: 'usurio correcto'
                })
            } else {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: 'usuario u contraseña incorrectos'
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
}

module.exports = {
    getDatos,
    postDatos,
    updateDatos,
    deleteDatos,
    getDatosbyID,
    getClientes,
    getJOin,
    logueo
}