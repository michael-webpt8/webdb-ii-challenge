exports.up = async function(knex) {
  return knex.schema.createTable('sales', table => {
    table.increments('id');
    table
      .integer('sales_id')
      .unique()
      .notNullable();
    table.boolean('sold').notNullable();
    table.string('sold_to', 150).nullable();
    table.string('sold_by', 150).nullable();
    table.decimal('list_price').notNullable();
    table.decimal('sold_price').nullable();
    table
      .foreign('sales_id')
      .references('sales_id')
      .inTable('cars');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
