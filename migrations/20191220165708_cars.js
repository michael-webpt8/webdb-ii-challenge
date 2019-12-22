exports.up = async function(knex) {
  return knex.schema.createTable('cars', table => {
    table.increments('id');
    table
      .string('vin', 17)
      .notNull()
      .unique();
    table.string('make', 150).notNull();
    table.text('model').notNull();
    table
      .integer('mileage')
      .notNull()
      .defaultTo(0);
    table.string('transmission_type', 75).nullable();
    table.string('title_status', 45).nullable();
    table.integer('sales_id').unique();
  });
};

exports.down = async function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
