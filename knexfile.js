// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3', // DBMS driver
    useNullAsDefault: true, // needed when using sqlite
    connection: {
      // location of our DB
      filename: './data/car-dealer.db3',
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },
};
