import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    birthdate: "",
    addresses: [
      {
        address_id: "",
        address_line_1: "",
        address_line_2: "",
        address_type: "",
        city: "",
        created_at: "",
        pincode: "",
        state: "",
      },
    ],
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`
        );
        const data = await response.data;
        setUser(data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      addresses: [
        ...prevData.addresses.slice(0, index),
        {
          ...prevData.addresses[index],
          [name]: value,
        },
        ...prevData.addresses.slice(index + 1),
      ],
    }));
  };
  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/users/${userId}`,
        user
      );

      const updatedUser = response.data;
      console.log("User updated successfully:", updatedUser);
      setErr("");
      alert("User updated successfully");
      window.location = "/";
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error updating user:", error.response.data.error);
      setErr(error.response.data.error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/addresses/${id}`,
        user
      );
      alert("Address deleted successfully");
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <div className="container mt-5">
      <Link to="/">Home</Link>

      <h2>Edit User</h2>
      <form className="mt-5">
        <p className="text-center text-danger">{err}</p>
        <div class="form-group row mt-2">
          <label class="col-sm-2 col-form-label"> First Name*</label>
          <div class="col-sm-10">
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleInputChange}
              class="form-control  rounded-0 border-dark"
              required={true}
            />
          </div>
        </div>

        <div class="form-group row mt-2">
          <label class="col-sm-2 col-form-label"> Last Name*</label>
          <div class="col-sm-10">
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleInputChange}
              class="form-control  rounded-0 border-dark"
            />
          </div>
        </div>

        <div class="form-group row mt-2">
          <label class="col-sm-2 col-form-label"> Email*</label>
          <div class="col-sm-10">
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              class="form-control  rounded-0 border-dark"
            />
          </div>
        </div>

        <div class="form-group row mt-2">
          <label class="col-sm-2 col-form-label"> Mobile Number*</label>
          <div class="col-sm-10">
            <input
              type="number"
              name="mobile_number"
              value={user.mobile_number}
              onChange={handleInputChange}
              class="form-control  rounded-0 border-dark"
            />
          </div>
        </div>

        <div class="form-group row mt-2">
          <label class="col-sm-2 col-form-label"> Birthdate*</label>
          <div class="col-sm-10">
            <input
              type="date"
              name="birthdate"
              value={user.birthdate.split("T")[0]}
              onChange={handleInputChange}
              class="form-control  rounded-0 border-dark"
            />
          </div>
        </div>
        {user.addresses.map((e, index) => (
          <div div className="mt-5">
            <h4>Address Details:</h4>

            <div className="d-flex justify-content-between mt-5">
              <b>Address {index + 1}: </b>
              <button
                className="btn btn-danger btn-sm rounded-0"
                onClick={() => handleDelete(e.address_id)}
              >
                Delete
              </button>
            </div>

            <div className="row">
              <div class="form-group col-md-6">
                <label>Address Line 1*</label>
                <input
                  type="text"
                  class="form-control  rounded-0 border-dark"
                  name="address_line_1"
                  value={e.address_line_1}
                  //   onChange={handleInputChange}
                  onChange={(e) => handleAddressChange(e, index)}
                  placeholder="Enter Address "
                />
              </div>
              <div class="form-group col-md-6">
                <label>Address Line 2</label>
                <input
                  type="text"
                  class="form-control  rounded-0 border-dark"
                  name="address_line_2"
                  value={e.address_line_2}
                  //   onChange={handleInputChange}
                  onChange={(e) => handleAddressChange(e, index)}
                  placeholder="Enter Address"
                />
              </div>
            </div>

            <div class="row mt-3">
              <div class="form-group col-md-4">
                <label>City*</label>
                <input
                  type="text"
                  class="form-control  rounded-0 border-dark"
                  name="city"
                  value={e.city}
                  onChange={(e) => handleAddressChange(e, index)}
                  //   onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              <div class="form-group col-md-4">
                <label>State*</label>
                <input
                  type="text"
                  class="form-control  rounded-0 border-dark"
                  name="state"
                  value={e.state}
                  onChange={(e) => handleAddressChange(e, index)}
                  //   onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-2">
                <label>Pincode*</label>
                <input
                  type="text"
                  class="form-control  rounded-0 border-dark"
                  name="pincode"
                  value={e.pincode}
                  onChange={(e) => handleAddressChange(e, index)}
                  //   onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-2">
                <label>Address Type*</label>
                <select
                  class="form-control  rounded-0 border-dark"
                  name="address_type"
                  value={e.address_type}
                  onChange={(e) => handleAddressChange(e, index)}
                  //   onChange={handleInputChange}
                >
                  <option value="" selected disabled>
                    Choose...
                  </option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-dark mt-5 mb-5 rounded-0"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
