
exports.up = async function (knex) {
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.string('vin', 17).notNull().unique()

  })
};

exports.down = function (knex) {

};
