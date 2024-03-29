import React from "react";

export const ListHeader = ({ listName }) => {
  return (
    <div className="list-header">
      <h1 className="heading">{listName}</h1>
    </div>
  );
};
