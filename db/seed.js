// grab our client with destructuring from the export in index.js
const { client, getAllSupervisors, createSupervisor } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
          DROP TABLE IF EXISTS supervisors;
        `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.log("Error dropping tables...ACTION NEEDED");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables...");

    await client.query(`
          CREATE TABLE supervisors (
            id SERIAL PRIMARY KEY,
            title varchar(250) UNIQUE NOT NULL,
            name varchar(250) NOT NULL,
            telephone varchar(20) UNIQUE NOT NULL
          );
        `);
    console.log("Finished creating tables");
  } catch (error) {
    console.log("Error creating tables...ACTION NEEDED");

    throw error;
  }
}

async function createInitialSupervisors() {
  try {
    console.log("Starting to create supervisor data...");

    const supervisorOne = await createSupervisor({
      title: "Stores Receving Supervisor",
      name: "David Thomas",
      telephone: "904-534-6378",
    });
    console.log("First Supervisor", supervisorOne);
    return supervisorOne;

    // const supervisorTwo = await createInitialSupervisors({
    //   title: "Housing Facilities Coordinator",
    //   name: "Samantha Lento",
    //   Telephone: "904-620-4679",
    // });
    // console.log("Second Supervisor", supervisorTwo);
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const supervisors = await getAllSupervisors();
    console.log("getAllSupervisors", supervisors);

    const initialData = await createInitialSupervisors();
    console.log("createInitialSupervisors", initialData);

    console.log("Finished testing database!");
  } catch (error) {
    console.error("Error testing database...ACTION NEEDED");
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
