exports.seed = async function(knex) {
  await knex('cars').truncate();
  await knex('cars').insert([
    {
      vin: '1234567890abcdefg',
      make: 'accord',
      model: 'honda',
      mileage: 88000,
      transmission_type: 'automatic',
      title_status: 'clean'
    },
    {
      vin: '2134567890abcdeft',
      make: 'oddessey',
      model: 'honda',
      mileage: 66125
    },
    {
      vin: '1234567890abcdefd',
      make: 'accord',
      model: 'honda',
      mileage: 88000,
      transmission_type: 'automatic',
      title_status: 'clean'
    },
    {
      vin: '3214567890abcdefg',
      make: 'taurus',
      model: 'ford',
      mileage: 33000,
      transmission_type: 'automatic',
      title_status: 'salvage'
    }
  ]);
};
