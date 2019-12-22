exports.seed = async function(knex) {
  await knex('sales').truncate();
  await knex('sales').insert([
    {
      sold: true,
      sold_to: 'Mikey Williams',
      sold_by: 'Leslie Bergeron',
      list_price: 500.45,
      sold_price: 455.65
    },
    {
      sold: false,
      sold_to: 'jerry finn',
      list_price: 535.45
    },
    {
      sold: true,
      sold_to: 'happy wilson',
      sold_by: 'carol Bergeron',
      list_price: 540.76,
      sold_price: 455.65
    },
    {
      sold: false,
      sold_to: 'Mikey Williams',
      sold_by: 'Leslie Bergeron',
      list_price: 500.45,
      sold_price: 455.65
    }
  ]);
};
