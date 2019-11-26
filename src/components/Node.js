import React from "react";

const Node = props => {
  const {
    row,
    col,
    isStart,
    isFinish,
    isWall,
    onMouseEnter,
    onMouseUp,
    onMouseDown
  } = props;

  const extraclass = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <td
      id={`node-${row}-${col}`}
      className={`node ${extraclass}`}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {isStart ? "S" : isFinish ? "F" : null}
    </td>
  );
};

export default Node;
