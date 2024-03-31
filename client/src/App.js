import React from "react";
import { ListHeader } from "./components/ListHeader";
import ListItem from "./components/ListItem";
// import { Modal } from "./components/modal";
import { useEffect, useState } from "react";

const App = () => {
  const [places, setPlaces] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}`);
      const json = await response.json();
      setPlaces(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);
  console.log(places);
  return (
    <div className="app">
      <div className="heading-container">
        <ListHeader listName={"tomato"} />
      </div>
      <div className="list-container">
        {places &&
          places.map((place) => (
            <ListItem key={place.id} place={place} getData={getData} />
          ))}
      </div>
    </div>
  );
};

export default App;
