const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/supervisor-lines");

async function getAllSupervisors() {
  const { rows } = await client.query(
    `SELECT *
      FROM supervisors;
      `
  );
  return rows;
}

async function createSupervisor({ title, name, telephone }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO supervisors(title, name, telephone)
        VALUES ($1, $2, $3);
      `,
      [title, name, telephone]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllSupervisors,
  createSupervisor,
};
