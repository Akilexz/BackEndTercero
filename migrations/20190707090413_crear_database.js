;
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('clientes', function(t) {
            t.increments('id');
            t.string('nombre');
            t.string('apellido');
            t.string('hora');
            t.string('identificacion').notNullable().unique();
            t.string('email');
        })
        .createTable('profesores', function(t) {
            t.increments('id');
            t.string('identificacion').notNullable().unique();
            t.string('nombre');
            t.string('apellido');
            t.string('email');
            t.string('titulosProfesionaels')
        })
        .createTable('login', function(t) {
            t.increments('id');
            t.string('user');
            t.string('password');
        })
        .createTable('gestion', function(t) {
            t.increments('id');
            t.string('titulo');
            t.string('direccionCorreo');
            t.string('paginaWeb');
            t.string('informacion');
            t.string('tituloCronograma');
            t.string('telefono');
            t.string('correoUno');
            t.string('correoDos');
            t.integer('idClientes').references('id').inTable('clientes');
            t.integer('idProfesores').references('id').inTable('profesores');
        })
        .createTable('respaldoProfesores', function(t) {
            t.increments('id');
            t.string('identificacion').notNullable().unique();
            t.string('nombre');
            t.string('apellido');
            t.string('email');
            t.string('titulosProfesionaels');
        })

};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('gestion')
        .dropTable('profesores')
        .dropTable('login')
        .dropTable('clientes')
        .dropTable('respaldoProfesores')

};