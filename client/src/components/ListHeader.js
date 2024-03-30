import React from "react";
import Modal from "./modal";
import { useState } from "react";

export const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="heading">
        <h1 className="tomato">{listName}</h1>
      </div>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </>
  );
};
