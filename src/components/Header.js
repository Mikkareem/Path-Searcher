import React from "react";

const Header = props => {
  return (
    <div className="header">
      <h1>Path Searcher</h1>
      <label forHtml="algorithms">
        Algorithm
        <select
          id="algorithms"
          value={props.algorithm}
          onChange={e => props.changeAlgorithm(e.target.value)}
        >
          {props.Algorithms.map(algo => {
            return (
              <option key={algo} value={algo}>
                {algo}
              </option>
            );
          })}
        </select>
      </label>
      <label forHtml="mazes">
        Maze
        <select
          id="mazes"
          value={props.maze}
          onChange={e => props.changeMaze(e.target.value)}
        >
          {props.Mazes.map(maze => {
            return (
              <option key={maze} value={maze}>
                {maze}
              </option>
            );
          })}
        </select>
      </label>
      <label forHtml="speeds">
        Speed
        <select
          id="speeds"
          value={props.speed}
          onChange={e => props.changeSpeed(e.target.value)}
        >
          {props.Speeds.map(speed => {
            return (
              <option key={speed} value={speed}>
                {speed}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default Header;
