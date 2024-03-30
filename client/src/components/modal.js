import React, { useState } from "react";

const Modal = ({ setShowModal }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    zone: "",
    base_distance_in_km: "",
    type: "",
    km_price: "1.00",
    fix_price: "100.00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      const kmPrice = value === "perishable" ? "1.50" : "1.00";
      setData((prevData) => ({
        ...prevData,
        [name]: value,
        km_price: kmPrice,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const postData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Add a Restaurant</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form onSubmit={postData}>
          <input
            required
            maxLength={255}
            placeholder="Restaurant name"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
          <br />
          <input
            required
            maxLength={255}
            placeholder="Restaurant description"
            value={data.description}
            name="description"
            onChange={handleChange}
          />
          <br />
          <input
            required
            maxLength={32}
            placeholder="Zone"
            value={data.zone}
            name="zone"
            onChange={handleChange}
          />
          <br />
          <input
            required
            type="number"
            placeholder="Distance"
            value={data.base_distance_in_km}
            name="base_distance_in_km"
            onChange={handleChange}
          />
          <br />
          <select
            required
            name="type"
            value={data.type}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="non-perishable">Non-Perishable</option>
            <option value="perishable">Perishable</option>
          </select>
          <br />
          <button className="create" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
