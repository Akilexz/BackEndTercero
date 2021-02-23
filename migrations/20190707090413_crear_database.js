;
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('profesores', function(t) {
            t.increments('id');
            t.string('identificacion').notNullable().unique();
            t.string('nombre');
            t.string('apellido');
            t.string('email');
            t.string('titulosProfesionaels')
        })
        .createTable('gestion', function(t) {
            t.increments('id');
            t.string('titulo');
            t.string('direccionCorreo');
            t.string('informacion');
            t.string('tituloCronograma');
            t.string('fecha');
            t.string('hora');
            // t.integer('idClientes').references('id').inTable('clientes');
            t.integer('idProfesores').references('id').inTable('profesores');
        })
        .createTable('clientes', function(t) {
            t.increments('id');
            t.string('nombre');
            t.string('apellido');
            t.string('hora');
            t.string('identificacion').notNullable().unique();
            t.string('email');
            t.integer('idGestion').references('id').inTable('gestion');
        })

    .createTable('login', function(t) {
            t.increments('id');
            t.string('user');
            t.string('password');
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
        .dropTable('profesores')
        .dropTable('clientes')
        .dropTable('gestion')
        .dropTable('login')
        .dropTable('respaldoProfesores')

};