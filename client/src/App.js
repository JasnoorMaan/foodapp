import React from "react";
import { ListHeader } from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

const App = () => {
  const getData = async () => {
    try {
      const response = await fetch();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="app">
      <ListHeader listName={"tomato"} />
    </div>
  );
};

export default App;
