exports.up = async function(knex) {
  return knex.schema.createTable('sales', table => {
    table.increments('sales_id');
    table.boolean('sold').nullable();
    table.string('sold_to', 150).notNullable();
    table.string('sold_by', 150).notNullable();
    table.decimal('list_price').nullable();
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
