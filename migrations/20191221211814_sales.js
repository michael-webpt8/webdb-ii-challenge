exports.up = async function(knex) {
  knex.schema.createTable('sales', tables => {
    tables.increments('sales_id');
    tables.boolean('sold').nullable();
    tables.string('sold_to', 150).notNullable();
    tables.string('sold_by', 150).notNullable();
    tables.decimal('list_price').notNullable();
    tables.decimal('sold_price').notNullable();
  });
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('sales');
};
