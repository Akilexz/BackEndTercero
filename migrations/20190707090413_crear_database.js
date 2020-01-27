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

};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('clientes')
        .dropTable('profesores')
        .dropTable('login')

};