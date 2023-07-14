import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./formdesigner.css";

// Define the draggable element
const DraggableElement = ({ id, text, type }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { id, type, text },
    type: "element",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div>
      {text}
      <input
        ref={dragRef}
        type={type}
        placeholder={text}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          padding: "0.5rem",
          backgroundColor: "lightblue",
          margin: "0.5rem",
          display: "inline-block",
        }}
      ></input>
    </div>
  );
};

// Define the droppable container
const DroppableContainer = () => {
  const [droppedElements, setDroppedElements] = useState([]);

  const handleDrop = useCallback(
    (item) => {
      console.log("item", item);
      setDroppedElements((prevElements) => [...prevElements, item]);
    },
    [setDroppedElements]
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: "element",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const SaveDesign = () => {
    console.log("droppedElements", droppedElements);
    let formElements = JSON.stringify(droppedElements);
    localStorage.setItem("formElements", formElements);
  };
  // console.log("droppedElements", droppedElements);
  return (
    <div
      ref={dropRef}
      style={{
        padding: "1rem",
        backgroundColor: isOver ? "lightgreen" : "lightgray",
        minHeight: "10rem",
      }}
    >
      {droppedElements.map((element) => (
        <div key={element.id} style={{ margin: "0.5rem" }}>
          {element.text}
          {element.type == "text" ? (
            <input type={element.type} placeholder={element.text} />
          ) : (
            <select>
              <option>option1</option>
              <option>option2</option>
              <option>option3</option>
              <option>option4</option>
            </select>
          )}
        </div>
      ))}
      <button onClick={SaveDesign}>Save Design</button>
    </div>
  );
};

// Main app component
const FormDesigner = () => {
  return (
    <>
      <h2>Form Design Page</h2>
      <hr/>
      <div className="app">
        <DndProvider backend={HTML5Backend}>
          <div className="draggable_elements">
            <h3>Elements</h3>
            <DraggableElement id="element1" text="Text Box" type="text" />
            <DraggableElement id="element2" text="Dropdown" type="dropdown" />
          </div>
          <div className="droppable_container">
            <h3>Form Design</h3>
            <DroppableContainer />
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default FormDesigner;
