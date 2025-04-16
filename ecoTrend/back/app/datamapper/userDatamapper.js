const client = require('../services/clientPg');

const userDatamapper = {
  getUserByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM "user" WHERE "email"=$1';
      const value = [email];

      const userFounded = await client.query(query, value);
      return userFounded.rows[0];
    } catch (error) {
      return console.error('No user Found');
    }
  },

  addUser: async (newUser) => {
    try {
      const userToAdd = newUser;

      const query = `
      INSERT INTO "user"("firstname","lastname","email","user_password", "role_user") 
      VALUES ($1, $2,$3,$4,$5)`;

      const { firstname, lastname, email, user_password } = userToAdd;
      const values = [firstname, lastname, email, user_password, 'user'];

      const result = await client.query(query, values);
      return result;
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = userDatamapper;
