import React, { useState } from "react";

const getRandomPosition = () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
});

const Box = ({ index, createBox }) => {
  const [position, setPosition] = useState(getRandomPosition);
  const [connectedBoxes, setConnectedBoxes] = useState([]);

  const handleBoxClick = () => {
    const newBoxId = Date.now();
    createBox(newBoxId);
    setConnectedBoxes([...connectedBoxes, newBoxId]);
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        className="w-24 h-24 p-4 border bg-pink-400 text-white rounded-md"
        style={{ position: "absolute", left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
      >
        <p className="text-lg font-bold mb-2 text-center">{index}</p>
        {connectedBoxes.map((connectedId) => (
          <div key={connectedId} className="dashed-line" />
        ))}
        <button
          onClick={handleBoxClick}
          className="w-full bg-pink-200 text-pink-500 text-lg font-bold rounded"
        >
          +
        </button>
      </div>
    </>
  );
};

const App = () => {
  const [boxes, setBoxes] = useState([Date.now()]);

  const createBox = (newBoxId) => {
    setBoxes([...boxes, newBoxId]);
  };

  return (
    <div>
      {boxes.map((boxId, index) => (
        <Box key={boxId} id={boxId} index={index} createBox={createBox} />
      ))}
    </div>
  );
};

export default App;
