import React, { useState, useEffect } from "react";
import axios from "axios";

const ListItem = ({ place }) => {
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeliveryPrice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/price", {
        zone: place.zone,
        organization_id: place.organization_id,
        total_distance: place.base_distance_in_km,
        item_type: place.item_type,
      });

      setDeliveryPrice(response.data.total_price);
    } catch (err) {
      console.error("Error fetching delivery price:", err);
      setError(err.message || "An error occurred while fetching price.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optionally fetch the delivery price on component mount, if needed
    // fetchDeliveryPrice();
  }, []); // Empty dependency array to prevent infinite loops

  return (
    <div className="card-item">
      <h1 className="restName">{place.organisation_name}</h1>
      <h3 className="restZone">{place.zone}</h3>
      <p className="restDes">
        {place.base_distance_in_km}, {place.km_price} {place.item_type}
      </p>
      <button
        className="price-button"
        onClick={fetchDeliveryPrice}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Delivery Price"}
      </button>
      {deliveryPrice !== null && (
        <p className="delivery-price">
          Delivery Price: {deliveryPrice.toFixed(2)}
        </p>
      )}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default ListItem;
