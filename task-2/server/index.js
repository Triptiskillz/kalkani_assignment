const { Client } = require("pg");
const pool = require("./db/pool");

pool.connect();
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAddress() {
  const streetNames = ["Main St", "Oak St", "Maple Ave", "Cedar Ln", "Elm St"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const states = ["NY", "CA", "IL", "TX", "AZ"];

  const address = {
    addressLine1: `${getRandomInt(100, 999)} ${
      streetNames[getRandomInt(0, streetNames.length - 1)]
    }`,
    addressLine2:
      getRandomInt(1, 10) < 5 ? `Apt ${getRandomInt(101, 999)}` : "",
    pincode: `${getRandomInt(1000, 9999)}`,
    city: cities[getRandomInt(0, cities.length - 1)],
    state: states[getRandomInt(0, states.length - 1)],
    addressType: getRandomInt(1, 10) < 5 ? "Home" : "Office",
  };

  return address;
}

async function generateDummyData() {
  for (let i = 0; i < 50; i++) {
    const firstName = `User${i + 1}`;
    const lastName = "Doe";
    const email = `user${i + 1}@example.com`.toLowerCase();
    const mobileNumber = `555555${getRandomInt(1000, 9999)}`;
    const birthdate = new Date(1980, getRandomInt(0, 11), getRandomInt(1, 28));

    const userQuery = `
        INSERT INTO users (first_name, last_name, email, mobile_number, birthdate)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id;
      `;

    const userValues = [firstName, lastName, email, mobileNumber, birthdate];
    const userResult = await client.query(userQuery, userValues);
    const userId = userResult.rows[0].user_id;

    const address = generateRandomAddress();
    console.log(`Email causing the violation: ${email}`);

    const addressQuery = `
        INSERT INTO addresses (user_id, address_line_1, address_line_2, pincode, city, state, address_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;

    const addressValues = [
      userId,
      address.addressLine1,
      address.addressLine2,
      address.pincode,
      address.city,
      address.state,
      address.addressType,
    ];
    await client.query(addressQuery, addressValues);
  }

  client.end();
}

generateDummyData();
