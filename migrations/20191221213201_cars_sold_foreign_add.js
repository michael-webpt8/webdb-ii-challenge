exports.up = async function(knex) {
  knex.schema.table('cars', tables => {
    tables
      .foreign('sales_id')
      .references('sales_id')
      .inTable('sales');
  });
};

exports.down = function(knex) {
  knex.schema.table('cars', tables => {
    tables.dropColumn('sales_id');
  });
};
