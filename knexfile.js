// Update with your config settings.

module.exports = {

  development: {
    client: "sqlite3", // DBMS driver
    useNullAsDefault: true, // needed when using sqlite
    connection: { // location of our DB
      filename: "./data/car-dealer.db3"
    }
  },

};
