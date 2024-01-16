const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
require("dotenv").config();

router.get("/user", async (req, res) => {
  try {
    const { searchString, minAge, maxAge, city } = req.query;
    // console.log(searchString, minAge, maxAge, city);
    // Build the SQL query dynamically based on provided filters
    const queryParams = [];
    let query = "SELECT * FROM users WHERE true";

    if (searchString) {
      query +=
        " AND (LOWER(first_name) LIKE $1 OR LOWER(last_name) LIKE $1 OR LOWER(email) LIKE $1)";
      queryParams.push(`%${searchString.toLowerCase()}%`);
    }

    if (minAge) {
      let len = queryParams.length + 1;
      query += ` AND EXTRACT(YEAR FROM AGE(NOW(), birthdate)) >= ${`$` + len}`;
      queryParams.push(parseInt(minAge));
    }

    if (maxAge) {
      let len = queryParams.length + 1;
      query += ` AND EXTRACT(YEAR FROM AGE(NOW(), birthdate)) <=  ${`$` + len}`;
      queryParams.push(parseInt(maxAge));
    }

    if (city) {
      let len = queryParams.length + 1;
      query += ` AND user_id IN (SELECT user_id FROM addresses WHERE LOWER(city) =  ${
        `$` + len
      })`;
      queryParams.push(city.toLowerCase());
    }
    // Execute the query
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const query = `
      SELECT u.*, a.*
      FROM users u
      LEFT JOIN addresses a ON u.user_id = a.user_id
      WHERE u.user_id = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      // Group addresses by user ID
      const groupedAddresses = result.rows.reduce((acc, row) => {
        const {
          user_id,
          address_id,
          address_line_1,
          address_line_2,
          pincode,
          city,
          state,
          address_type,
        } = row;
        if (!acc[user_id]) {
          acc[user_id] = {
            user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            mobile_number: row.mobile_number,
            birthdate: row.birthdate,
            created_at: row.created_at,
            addresses: [],
          };
        }
        if (address_id) {
          acc[user_id].addresses.push({
            address_id,
            address_line_1,
            address_line_2,
            pincode,
            city,
            state,
            address_type,
            created_at: row.created_at,
          });
        }
        return acc;
      }, {});

      res.json(Object.values(groupedAddresses));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      birthdate,
      addresses,
    } = req.body;

    // Validate input data
    if (!first_name || !last_name || !email || !mobile_number || !birthdate) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (mobile_number.length != 10) {
      return res
        .status(400)
        .json({ error: "Mobile Number length must be equal to 10 digit!" });
    }

    // Update user information
    const updateUserQuery = `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3, mobile_number = $4, birthdate = $5
      WHERE user_id = $6
    `;

    const updateUserParams = [
      first_name,
      last_name,
      email,
      mobile_number,
      birthdate,
      userId,
    ];
    await pool.query(updateUserQuery, updateUserParams);

    // Update addresses (assuming that addresses is an array of address objects)

    if (addresses && addresses.length > 0) {
      for (const address of addresses) {
        const {
          address_id,
          address_line_1,
          address_line_2,
          pincode,
          city,
          state,
          address_type,
        } = address;
        if (
          !address_line_1 ||
          !pincode ||
          !city ||
          !state ||
          !address_type ||
          !/^\d{4,6}$/.test(pincode) // Validate pincode format
        ) {
          return res.status(400).json({
            error: "Missing required fields or PinCode Length between 4 to 6",
          });
        }
        // Update each address
        const updateAddressQuery = `
          UPDATE addresses
          SET address_line_1 = $1, address_line_2 = $2, pincode = $3, city = $4, state = $5, address_type = $6
          WHERE address_id = $7
        `;

        const updateAddressParams = [
          address_line_1,
          address_line_2,
          pincode,
          city,
          state,
          address_type,
          address_id,
        ];
        // console.log(updateAddressQuery, updateAddressParams);
        await pool.query(updateAddressQuery, updateAddressParams);
      }
    }

    res.json({
      message: "User information and addresses updated successfully",
    });
  } catch (error) {
    if (
      error.code === "23505" &&
      error.constraint === "users_mobile_number_key"
    ) {
      // Handle unique constraint violation for mobile_number
      return res.status(400).json({ error: "Mobile number already exists" });
    }
    if (error.code === "23505" && error.constraint === "users_email_key") {
      // Handle unique constraint violation for email
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/addresses/:addressId", async (req, res) => {
  try {
    const addressId = req.params.addressId;

    // Delete the address
    const deleteAddressQuery = "DELETE FROM addresses WHERE address_id = $1";
    await pool.query(deleteAddressQuery, [addressId]);

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
